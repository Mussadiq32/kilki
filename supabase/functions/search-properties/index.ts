
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders
    });
  }

  try {
    // Get environment variables
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceRole);

    let params;
    
    // Handle both query params in URL and in request body for backward compatibility
    if (req.method === 'GET') {
      // Get search parameters from URL
      const url = new URL(req.url);
      params = {
        query: url.searchParams.get("query"),
        location: url.searchParams.get("location"),
        minPrice: url.searchParams.get("minPrice"),
        maxPrice: url.searchParams.get("maxPrice"),
        type: url.searchParams.get("type"),
        sort: url.searchParams.get("sort") || "newest",
        limit: url.searchParams.get("limit") ? parseInt(url.searchParams.get("limit") || "10") : 10,
        autoSuggest: url.searchParams.get("autoSuggest") === "true"
      };
    } else {
      // Parse parameters from request body
      const body = await req.json();
      const bodyParams = body.params || {};
      
      params = {
        query: bodyParams.query || null,
        location: bodyParams.location || null,
        minPrice: bodyParams.minPrice || null,
        maxPrice: bodyParams.maxPrice || null,
        type: bodyParams.type || null,
        sort: bodyParams.sort || "newest",
        limit: bodyParams.limit ? parseInt(bodyParams.limit) : 10,
        autoSuggest: bodyParams.autoSuggest === "true"
      };
    }
    
    console.log(`Received search request - Query: ${params.query}, Location: ${params.location}, Price Range: ${params.minPrice}-${params.maxPrice}, Type: ${params.type}, Sort: ${params.sort}, AutoSuggest: ${params.autoSuggest}`);

    // If it's an auto-suggest request, handle it differently
    if (params.autoSuggest) {
      // Get search suggestions based on title, location, or type
      let suggestions = [];
      
      // Get property title suggestions if query is provided
      if (params.query && params.query.trim() !== "") {
        const { data: titleData, error: titleError } = await supabase
          .from("properties")
          .select("title")
          .ilike("title", `%${params.query}%`)
          .limit(5);
          
        if (!titleError && titleData) {
          suggestions = [...suggestions, ...titleData.map(item => ({ 
            text: item.title,
            type: 'title'
          }))];
        }
        
        // Also search for matching locations
        const { data: locationData, error: locationError } = await supabase
          .from("properties")
          .select("location")
          .ilike("location", `%${params.query}%`)
          .limit(5);
          
        if (!locationError && locationData) {
          // Deduplicate locations
          const uniqueLocations = [...new Set(locationData.map(item => item.location))];
          suggestions = [...suggestions, ...uniqueLocations.map(loc => ({
            text: loc,
            type: 'location'
          }))];
        }
      }
      
      console.log("Returning suggestions:", suggestions);
      
      return new Response(
        JSON.stringify({ suggestions }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders
          }
        }
      );
    }

    // Regular search request
    // Start building the query
    let supabaseQuery = supabase.from("properties").select("*");

    // Apply text search if provided with improved fuzzy search
    if (params.query && params.query.trim() !== "") {
      // Split query into words for more flexible matching
      const words = params.query.trim().toLowerCase().split(/\s+/);
      
      if (words.length === 1) {
        // Single word query - use simple pattern matching
        const searchPattern = `%${params.query}%`;
        supabaseQuery = supabaseQuery.or(`title.ilike.${searchPattern},description.ilike.${searchPattern},location.ilike.${searchPattern}`);
      } else {
        // Multi-word query - build more complex condition
        // This creates a query that will match if ANY of the words appear in title OR description
        const patterns = words.map(word => {
          const pattern = `%${word}%`;
          return `title.ilike.${pattern},description.ilike.${pattern}`;
        });
        
        supabaseQuery = supabaseQuery.or(patterns.join(','));
      }
    }

    // Apply location filter if provided with improved matching
    if (params.location && params.location !== "all") {
      // Instead of exact match, use pattern matching for more flexible location search
      supabaseQuery = supabaseQuery.ilike("location", `%${params.location}%`);
    }

    // Apply price range filters if provided
    if (params.minPrice && !isNaN(Number(params.minPrice))) {
      supabaseQuery = supabaseQuery.gte("price", Number(params.minPrice));
    }

    if (params.maxPrice && !isNaN(Number(params.maxPrice))) {
      supabaseQuery = supabaseQuery.lte("price", Number(params.maxPrice));
    }

    // Apply property type filter if provided
    if (params.type && params.type !== "all") {
      supabaseQuery = supabaseQuery.eq("type", params.type);
    }

    // Apply sorting with additional options
    switch (params.sort) {
      case "price_asc":
        supabaseQuery = supabaseQuery.order("price", { ascending: true });
        break;
      case "price_desc":
        supabaseQuery = supabaseQuery.order("price", { ascending: false });
        break;
      case "popular":
        // Sort by featured properties first, then by newest
        supabaseQuery = supabaseQuery
          .order("featured", { ascending: false })
          .order("created_at", { ascending: false });
        break;
      case "newest":
      default:
        supabaseQuery = supabaseQuery.order("created_at", { ascending: false });
        break;
    }

    // Apply limit if provided
    if (params.limit) {
      supabaseQuery = supabaseQuery.limit(params.limit);
    }

    // Execute the query
    const { data, error } = await supabaseQuery;

    if (error) {
      console.error("Error executing search query:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders
          }
        }
      );
    }

    console.log(`Search successful, found ${data?.length || 0} properties`);

    // Return the results with pagination info
    return new Response(
      JSON.stringify({ 
        data, 
        count: data?.length || 0,
        hasMore: data && data.length === params.limit
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );

  } catch (err) {
    console.error("Unexpected error in search properties function:", err);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
  }
});
