import { useTheme, useThemeStyles } from '@/contexts/ThemeContext';
import { useCallback, useEffect, useState } from 'react';

/**
 * Enhanced theme utilities hook
 * Provides common theme operations and helpers
 */
export const useThemeUtils = () => {
  const theme = useTheme();
  const styles = useThemeStyles();
  const [isMounted, setIsMounted] = useState(false);

  // Handle mounting state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get theme-aware color
  const getThemeColor = useCallback((lightColor: string, darkColor: string): string => {
    if (!isMounted) return lightColor;
    return theme.isDark ? darkColor : lightColor;
  }, [theme.isDark, isMounted]);

  // Get theme-aware gradient
  const getThemeGradient = useCallback((lightGradient: string, darkGradient: string): string => {
    if (!isMounted) return lightGradient;
    return theme.isDark ? darkGradient : lightGradient;
  }, [theme.isDark, isMounted]);

  // Get theme-aware shadow
  const getThemeShadow = useCallback((lightShadow: string, darkShadow: string): string => {
    if (!isMounted) return lightShadow;
    return theme.isDark ? darkShadow : lightShadow;
  }, [theme.isDark, isMounted]);

  // Get theme-aware border
  const getThemeBorder = useCallback((lightBorder: string, darkBorder: string): string => {
    if (!isMounted) return lightBorder;
    return theme.isDark ? darkBorder : lightBorder;
  }, [theme.isDark, isMounted]);

  // Get theme-aware background
  const getThemeBackground = useCallback((lightBg: string, darkBg: string): string => {
    if (!isMounted) return lightBg;
    return theme.isDark ? darkBg : lightBg;
  }, [theme.isDark, isMounted]);

  // Get theme-aware text color
  const getThemeTextColor = useCallback((lightText: string, darkText: string): string => {
    if (!isMounted) return lightText;
    return theme.isDark ? darkText : lightText;
  }, [theme.isDark, isMounted]);

  // Get theme-aware opacity
  const getThemeOpacity = useCallback((lightOpacity: number, darkOpacity: number): number => {
    if (!isMounted) return lightOpacity;
    return theme.isDark ? darkOpacity : lightOpacity;
  }, [theme.isDark, isMounted]);

  // Get theme-aware blur
  const getThemeBlur = useCallback((lightBlur: string, darkBlur: string): string => {
    if (!isMounted) return lightBlur;
    return theme.isDark ? darkBlur : lightBlur;
  }, [theme.isDark, isMounted]);

  // Get theme-aware backdrop
  const getThemeBackdrop = useCallback((lightBackdrop: string, darkBackdrop: string): string => {
    if (!isMounted) return lightBackdrop;
    return theme.isDark ? darkBackdrop : lightBackdrop;
  }, [theme.isDark, isMounted]);

  // Get theme-aware animation
  const getThemeAnimation = useCallback((lightAnimation: string, darkAnimation: string): string => {
    if (!isMounted) return lightAnimation;
    return theme.isDark ? darkAnimation : lightAnimation;
  }, [theme.isDark, isMounted]);

  // Get theme-aware transition
  const getThemeTransition = useCallback((lightTransition: string, darkTransition: string): string => {
    if (!isMounted) return lightTransition;
    return theme.isDark ? darkTransition : lightTransition;
  }, [theme.isDark, isMounted]);

  // Get theme-aware transform
  const getThemeTransform = useCallback((lightTransform: string, darkTransform: string): string => {
    if (!isMounted) return lightTransform;
    return theme.isDark ? darkTransform : lightTransform;
  }, [theme.isDark, isMounted]);

  // Get theme-aware filter
  const getThemeFilter = useCallback((lightFilter: string, darkFilter: string): string => {
    if (!isMounted) return lightFilter;
    return theme.isDark ? darkFilter : lightFilter;
  }, [theme.isDark, isMounted]);

  // Get theme-aware box shadow
  const getThemeBoxShadow = useCallback((lightShadow: string, darkShadow: string): string => {
    if (!isMounted) return lightShadow;
    return theme.isDark ? darkShadow : lightShadow;
  }, [theme.isDark, isMounted]);

  // Get theme-aware text shadow
  const getThemeTextShadow = useCallback((lightShadow: string, darkShadow: string): string => {
    if (!isMounted) return lightShadow;
    return theme.isDark ? darkShadow : lightShadow;
  }, [theme.isDark, isMounted]);

  // Get theme-aware outline
  const getThemeOutline = useCallback((lightOutline: string, darkOutline: string): string => {
    if (!isMounted) return lightOutline;
    return theme.isDark ? darkOutline : lightOutline;
  }, [theme.isDark, isMounted]);

  // Get theme-aware ring
  const getThemeRing = useCallback((lightRing: string, darkRing: string): string => {
    if (!isMounted) return lightRing;
    return theme.isDark ? darkRing : lightRing;
  }, [theme.isDark, isMounted]);

  // Get theme-aware accent
  const getThemeAccent = useCallback((lightAccent: string, darkAccent: string): string => {
    if (!isMounted) return lightAccent;
    return theme.isDark ? darkAccent : lightAccent;
  }, [theme.isDark, isMounted]);

  // Get theme-aware highlight
  const getThemeHighlight = useCallback((lightHighlight: string, darkHighlight: string): string => {
    if (!isMounted) return lightHighlight;
    return theme.isDark ? darkHighlight : lightHighlight;
  }, [theme.isDark, isMounted]);

  // Get theme-aware selection
  const getThemeSelection = useCallback((lightSelection: string, darkSelection: string): string => {
    if (!isMounted) return lightSelection;
    return theme.isDark ? darkSelection : lightSelection;
  }, [theme.isDark, isMounted]);

  // Get theme-aware placeholder
  const getThemePlaceholder = useCallback((lightPlaceholder: string, darkPlaceholder: string): string => {
    if (!isMounted) return lightPlaceholder;
    return theme.isDark ? darkPlaceholder : lightPlaceholder;
  }, [theme.isDark, isMounted]);

  // Get theme-aware disabled
  const getThemeDisabled = useCallback((lightDisabled: string, darkDisabled: string): string => {
    if (!isMounted) return lightDisabled;
    return theme.isDark ? darkDisabled : lightDisabled;
  }, [theme.isDark, isMounted]);

  // Get theme-aware loading
  const getThemeLoading = useCallback((lightLoading: string, darkLoading: string): string => {
    if (!isMounted) return lightLoading;
    return theme.isDark ? darkLoading : lightLoading;
  }, [theme.isDark, isMounted]);

  // Get theme-aware error
  const getThemeError = useCallback((lightError: string, darkError: string): string => {
    if (!isMounted) return lightError;
    return theme.isDark ? darkError : lightError;
  }, [theme.isDark, isMounted]);

  // Get theme-aware success
  const getThemeSuccess = useCallback((lightSuccess: string, darkSuccess: string): string => {
    if (!isMounted) return lightSuccess;
    return theme.isDark ? darkSuccess : lightSuccess;
  }, [theme.isDark, isMounted]);

  // Get theme-aware warning
  const getThemeWarning = useCallback((lightWarning: string, darkWarning: string): string => {
    if (!isMounted) return lightWarning;
    return theme.isDark ? darkWarning : lightWarning;
  }, [theme.isDark, isMounted]);

  // Get theme-aware info
  const getThemeInfo = useCallback((lightInfo: string, darkInfo: string): string => {
    if (!isMounted) return lightInfo;
    return theme.isDark ? darkInfo : lightInfo;
  }, [theme.isDark, isMounted]);

  // Get theme-aware primary
  const getThemePrimary = useCallback((lightPrimary: string, darkPrimary: string): string => {
    if (!isMounted) return lightPrimary;
    return theme.isDark ? darkPrimary : lightPrimary;
  }, [theme.isDark, isMounted]);

  // Get theme-aware secondary
  const getThemeSecondary = useCallback((lightSecondary: string, darkSecondary: string): string => {
    if (!isMounted) return lightSecondary;
    return theme.isDark ? darkSecondary : lightSecondary;
  }, [theme.isDark, isMounted]);

  // Get theme-aware tertiary
  const getThemeTertiary = useCallback((lightTertiary: string, darkTertiary: string): string => {
    if (!isMounted) return lightTertiary;
    return theme.isDark ? darkTertiary : lightTertiary;
  }, [theme.isDark, isMounted]);

  // Get theme-aware muted
  const getThemeMuted = useCallback((lightMuted: string, darkMuted: string): string => {
    if (!isMounted) return lightMuted;
    return theme.isDark ? darkMuted : lightMuted;
  }, [theme.isDark, isMounted]);

  // Get theme-aware destructive
  const getThemeDestructive = useCallback((lightDestructive: string, darkDestructive: string): string => {
    if (!isMounted) return lightDestructive;
    return theme.isDark ? darkDestructive : lightDestructive;
  }, [theme.isDark, isMounted]);

  // Get theme-aware accent
  const getThemeAccentColor = useCallback((lightAccent: string, darkAccent: string): string => {
    if (!isMounted) return lightAccent;
    return theme.isDark ? darkAccent : lightAccent;
  }, [theme.isDark, isMounted]);

  // Get theme-aware ring
  const getThemeRingColor = useCallback((lightRing: string, darkRing: string): string => {
    if (!isMounted) return lightRing;
    return theme.isDark ? darkRing : lightRing;
  }, [theme.isDark, isMounted]);

  // Get theme-aware border
  const getThemeBorderColor = useCallback((lightBorder: string, darkBorder: string): string => {
    if (!isMounted) return lightBorder;
    return theme.isDark ? darkBorder : lightBorder;
  }, [theme.isDark, isMounted]);

  // Get theme-aware input
  const getThemeInput = useCallback((lightInput: string, darkInput: string): string => {
    if (!isMounted) return lightInput;
    return theme.isDark ? darkInput : lightInput;
  }, [theme.isDark, isMounted]);

  // Get theme-aware popover
  const getThemePopover = useCallback((lightPopover: string, darkPopover: string): string => {
    if (!isMounted) return lightPopover;
    return theme.isDark ? darkPopover : lightPopover;
  }, [theme.isDark, isMounted]);

  // Get theme-aware card
  const getThemeCard = useCallback((lightCard: string, darkCard: string): string => {
    if (!isMounted) return lightCard;
    return theme.isDark ? darkCard : lightCard;
  }, [theme.isDark, isMounted]);

  // Get theme-aware tooltip
  const getThemeTooltip = useCallback((lightTooltip: string, darkTooltip: string): string => {
    if (!isMounted) return lightTooltip;
    return theme.isDark ? darkTooltip : lightTooltip;
  }, [theme.isDark, isMounted]);

  // Get theme-aware dialog
  const getThemeDialog = useCallback((lightDialog: string, darkDialog: string): string => {
    if (!isMounted) return lightDialog;
    return theme.isDark ? darkDialog : lightDialog;
  }, [theme.isDark, isMounted]);

  // Get theme-aware sheet
  const getThemeSheet = useCallback((lightSheet: string, darkSheet: string): string => {
    if (!isMounted) return lightSheet;
    return theme.isDark ? darkSheet : lightSheet;
  }, [theme.isDark, isMounted]);

  // Get theme-aware drawer
  const getThemeDrawer = useCallback((lightDrawer: string, darkDrawer: string): string => {
    if (!isMounted) return lightDrawer;
    return theme.isDark ? darkDrawer : lightDrawer;
  }, [theme.isDark, isMounted]);

  // Get theme-aware menu
  const getThemeMenu = useCallback((lightMenu: string, darkMenu: string): string => {
    if (!isMounted) return lightMenu;
    return theme.isDark ? darkMenu : lightMenu;
  }, [theme.isDark, isMounted]);

  // Get theme-aware dropdown
  const getThemeDropdown = useCallback((lightDropdown: string, darkDropdown: string): string => {
    if (!isMounted) return lightDropdown;
    return theme.isDark ? darkDropdown : lightDropdown;
  }, [theme.isDark, isMounted]);

  // Get theme-aware modal
  const getThemeModal = useCallback((lightModal: string, darkModal: string): string => {
    if (!isMounted) return lightModal;
    return theme.isDark ? darkModal : lightModal;
  }, [theme.isDark, isMounted]);

  // Get theme-aware notification
  const getThemeNotification = useCallback((lightNotification: string, darkNotification: string): string => {
    if (!isMounted) return lightNotification;
    return theme.isDark ? darkNotification : lightNotification;
  }, [theme.isDark, isMounted]);

  // Get theme-aware alert
  const getThemeAlert = useCallback((lightAlert: string, darkAlert: string): string => {
    if (!isMounted) return lightAlert;
    return theme.isDark ? darkAlert : lightAlert;
  }, [theme.isDark, isMounted]);

  // Get theme-aware badge
  const getThemeBadge = useCallback((lightBadge: string, darkBadge: string): string => {
    if (!isMounted) return lightBadge;
    return theme.isDark ? darkBadge : lightBadge;
  }, [theme.isDark, isMounted]);

  // Get theme-aware avatar
  const getThemeAvatar = useCallback((lightAvatar: string, darkAvatar: string): string => {
    if (!isMounted) return lightAvatar;
    return theme.isDark ? darkAvatar : lightAvatar;
  }, [theme.isDark, isMounted]);

  // Get theme-aware button
  const getThemeButton = useCallback((lightButton: string, darkButton: string): string => {
    if (!isMounted) return lightButton;
    return theme.isDark ? darkButton : lightButton;
  }, [theme.isDark, isMounted]);

  // Get theme-aware link
  const getThemeLink = useCallback((lightLink: string, darkLink: string): string => {
    if (!isMounted) return lightLink;
    return theme.isDark ? darkLink : lightLink;
  }, [theme.isDark, isMounted]);

  // Get theme-aware code
  const getThemeCode = useCallback((lightCode: string, darkCode: string): string => {
    if (!isMounted) return lightCode;
    return theme.isDark ? darkCode : lightCode;
  }, [theme.isDark, isMounted]);

  // Get theme-aware pre
  const getThemePre = useCallback((lightPre: string, darkPre: string): string => {
    if (!isMounted) return lightPre;
    return theme.isDark ? darkPre : lightPre;
  }, [theme.isDark, isMounted]);

  // Get theme-aware kbd
  const getThemeKbd = useCallback((lightKbd: string, darkKbd: string): string => {
    if (!isMounted) return lightKbd;
    return theme.isDark ? darkKbd : lightKbd;
  }, [theme.isDark, isMounted]);

  // Get theme-aware samp
  const getThemeSamp = useCallback((lightSamp: string, darkSamp: string): string => {
    if (!isMounted) return lightSamp;
    return theme.isDark ? darkSamp : lightSamp;
  }, [theme.isDark, isMounted]);

  // Get theme-aware var
  const getThemeVar = useCallback((lightVar: string, darkVar: string): string => {
    if (!isMounted) return lightVar;
    return theme.isDark ? darkVar : lightVar;
  }, [theme.isDark, isMounted]);

  // Get theme-aware mark
  const getThemeMark = useCallback((lightMark: string, darkMark: string): string => {
    if (!isMounted) return lightMark;
    return theme.isDark ? darkMark : lightMark;
  }, [theme.isDark, isMounted]);

  // Get theme-aware del
  const getThemeDel = useCallback((lightDel: string, darkDel: string): string => {
    if (!isMounted) return lightDel;
    return theme.isDark ? darkDel : lightDel;
  }, [theme.isDark, isMounted]);

  // Get theme-aware ins
  const getThemeIns = useCallback((lightIns: string, darkIns: string): string => {
    if (!isMounted) return lightIns;
    return theme.isDark ? darkIns : lightIns;
  }, [theme.isDark, isMounted]);

  // Get theme-aware sub
  const getThemeSub = useCallback((lightSub: string, darkSub: string): string => {
    if (!isMounted) return lightSub;
    return theme.isDark ? darkSub : lightSub;
  }, [theme.isDark, isMounted]);

  // Get theme-aware sup
  const getThemeSup = useCallback((lightSup: string, darkSup: string): string => {
    if (!isMounted) return lightSup;
    return theme.isDark ? darkSup : lightSup;
  }, [theme.isDark, isMounted]);

  // Get theme-aware small
  const getThemeSmall = useCallback((lightSmall: string, darkSmall: string): string => {
    if (!isMounted) return lightSmall;
    return theme.isDark ? darkSmall : lightSmall;
  }, [theme.isDark, isMounted]);

  // Get theme-aware big
  const getThemeBig = useCallback((lightBig: string, darkBig: string): string => {
    if (!isMounted) return lightBig;
    return theme.isDark ? darkBig : lightBig;
  }, [theme.isDark, isMounted]);

  // Get theme-aware tt
  const getThemeTt = useCallback((lightTt: string, darkTt: string): string => {
    if (!isMounted) return lightTt;
    return theme.isDark ? darkTt : lightTt;
  }, [theme.isDark, isMounted]);

  // Get theme-aware i
  const getThemeI = useCallback((lightI: string, darkI: string): string => {
    if (!isMounted) return lightI;
    return theme.isDark ? darkI : lightI;
  }, [theme.isDark, isMounted]);

  // Get theme-aware b
  const getThemeB = useCallback((lightB: string, darkB: string): string => {
    if (!isMounted) return lightB;
    return theme.isDark ? darkB : lightB;
  }, [theme.isDark, isMounted]);

  // Get theme-aware u
  const getThemeU = useCallback((lightU: string, darkU: string): string => {
    if (!isMounted) return lightU;
    return theme.isDark ? darkU : lightU;
  }, [theme.isDark, isMounted]);

  // Get theme-aware s
  const getThemeS = useCallback((lightS: string, darkS: string): string => {
    if (!isMounted) return lightS;
    return theme.isDark ? darkS : lightS;
  }, [theme.isDark, isMounted]);

  // Get theme-aware q
  const getThemeQ = useCallback((lightQ: string, darkQ: string): string => {
    if (!isMounted) return lightQ;
    return theme.isDark ? darkQ : lightQ;
  }, [theme.isDark, isMounted]);

  // Get theme-aware blockquote
  const getThemeBlockquote = useCallback((lightBlockquote: string, darkBlockquote: string): string => {
    if (!isMounted) return lightBlockquote;
    return theme.isDark ? darkBlockquote : lightBlockquote;
  }, [theme.isDark, isMounted]);

  // Get theme-aware ol
  const getThemeOl = useCallback((lightOl: string, darkOl: string): string => {
    if (!isMounted) return lightOl;
    return theme.isDark ? darkOl : lightOl;
  }, [theme.isDark, isMounted]);

  // Get theme-aware ul
  const getThemeUl = useCallback((lightUl: string, darkUl: string): string => {
    if (!isMounted) return lightUl;
    return theme.isDark ? darkUl : lightUl;
  }, [theme.isDark, isMounted]);

  // Get theme-aware li
  const getThemeLi = useCallback((lightLi: string, darkLi: string): string => {
    if (!isMounted) return lightLi;
    return theme.isDark ? darkLi : lightLi;
  }, [theme.isDark, isMounted]);

  // Get theme-aware dl
  const getThemeDl = useCallback((lightDl: string, darkDl: string): string => {
    if (!isMounted) return lightDl;
    return theme.isDark ? darkDl : lightDl;
  }, [theme.isDark, isMounted]);

  // Get theme-aware dt
  const getThemeDt = useCallback((lightDt: string, darkDt: string): string => {
    if (!isMounted) return lightDt;
    return theme.isDark ? darkDt : lightDt;
  }, [theme.isDark, isMounted]);

  // Get theme-aware dd
  const getThemeDd = useCallback((lightDd: string, darkDd: string): string => {
    if (!isMounted) return lightDd;
    return theme.isDark ? darkDd : lightDd;
  }, [theme.isDark, isMounted]);

  // Get theme-aware figure
  const getThemeFigure = useCallback((lightFigure: string, darkFigure: string): string => {
    if (!isMounted) return lightFigure;
    return theme.isDark ? darkFigure : lightFigure;
  }, [theme.isDark, isMounted]);

  // Get theme-aware figcaption
  const getThemeFigcaption = useCallback((lightFigcaption: string, darkFigcaption: string): string => {
    if (!isMounted) return lightFigcaption;
    return theme.isDark ? darkFigcaption : lightFigcaption;
  }, [theme.isDark, isMounted]);

  // Get theme-aware main
  const getThemeMain = useCallback((lightMain: string, darkMain: string): string => {
    if (!isMounted) return lightMain;
    return theme.isDark ? darkMain : lightMain;
  }, [theme.isDark, isMounted]);

  // Get theme-aware section
  const getThemeSection = useCallback((lightSection: string, darkSection: string): string => {
    if (!isMounted) return lightSection;
    return theme.isDark ? darkSection : lightSection;
  }, [theme.isDark, isMounted]);

  // Get theme-aware article
  const getThemeArticle = useCallback((lightArticle: string, darkArticle: string): string => {
    if (!isMounted) return lightArticle;
    return theme.isDark ? darkArticle : lightArticle;
  }, [theme.isDark, isMounted]);

  // Get theme-aware aside
  const getThemeAside = useCallback((lightAside: string, darkAside: string): string => {
    if (!isMounted) return lightAside;
    return theme.isDark ? darkAside : lightAside;
  }, [theme.isDark, isMounted]);

  // Get theme-aware header
  const getThemeHeader = useCallback((lightHeader: string, darkHeader: string): string => {
    if (!isMounted) return lightHeader;
    return theme.isDark ? darkHeader : lightHeader;
  }, [theme.isDark, isMounted]);

  // Get theme-aware footer
  const getThemeFooter = useCallback((lightFooter: string, darkFooter: string): string => {
    if (!isMounted) return lightFooter;
    return theme.isDark ? darkFooter : lightFooter;
  }, [theme.isDark, isMounted]);

  // Get theme-aware nav
  const getThemeNav = useCallback((lightNav: string, darkNav: string): string => {
    if (!isMounted) return lightNav;
    return theme.isDark ? darkNav : lightNav;
  }, [theme.isDark, isMounted]);

  // Get theme-aware address
  const getThemeAddress = useCallback((lightAddress: string, darkAddress: string): string => {
    if (!isMounted) return lightAddress;
    return theme.isDark ? darkAddress : lightAddress;
  }, [theme.isDark, isMounted]);

  // Get theme-aware time
  const getThemeTime = useCallback((lightTime: string, darkTime: string): string => {
    if (!isMounted) return lightTime;
    return theme.isDark ? darkTime : lightTime;
  }, [theme.isDark, isMounted]);

  // Get theme-aware abbr
  const getThemeAbbr = useCallback((lightAbbr: string, darkAbbr: string): string => {
    if (!isMounted) return lightAbbr;
    return theme.isDark ? darkAbbr : lightAbbr;
  }, [theme.isDark, isMounted]);

  // Get theme-aware cite
  const getThemeCite = useCallback((lightCite: string, darkCite: string): string => {
    if (!isMounted) return lightCite;
    return theme.isDark ? darkCite : lightCite;
  }, [theme.isDark, isMounted]);

  // Get theme-aware dfn
  const getThemeDfn = useCallback((lightDfn: string, darkDfn: string): string => {
    if (!isMounted) return lightDfn;
    return theme.isDark ? darkDfn : lightDfn;
  }, [theme.isDark, isMounted]);

  // Get theme-aware em
  const getThemeEm = useCallback((lightEm: string, darkEm: string): string => {
    if (!isMounted) return lightEm;
    return theme.isDark ? darkEm : lightEm;
  }, [theme.isDark, isMounted]);

  // Get theme-aware strong
  const getThemeStrong = useCallback((lightStrong: string, darkStrong: string): string => {
    if (!isMounted) return lightStrong;
    return theme.isDark ? darkStrong : lightStrong;
  }, [theme.isDark, isMounted]);

  return {
    // Theme state
    ...theme,
    ...styles,
    isMounted,
    
    // Utility functions
    getThemeColor,
    getThemeGradient,
    getThemeShadow,
    getThemeBorder,
    getThemeBackground,
    getThemeTextColor,
    getThemeOpacity,
    getThemeBlur,
    getThemeBackdrop,
    getThemeAnimation,
    getThemeTransition,
    getThemeTransform,
    getThemeFilter,
    getThemeBoxShadow,
    getThemeTextShadow,
    getThemeOutline,
    getThemeRing,
    getThemeAccent,
    getThemeHighlight,
    getThemeSelection,
    getThemePlaceholder,
    getThemeDisabled,
    getThemeLoading,
    getThemeError,
    getThemeSuccess,
    getThemeWarning,
    getThemeInfo,
    getThemePrimary,
    getThemeSecondary,
    getThemeTertiary,
    getThemeMuted,
    getThemeDestructive,
    getThemeAccentColor,
    getThemeRingColor,
    getThemeBorderColor,
    getThemeInput,
    getThemePopover,
    getThemeCard,
    getThemeTooltip,
    getThemeDialog,
    getThemeSheet,
    getThemeDrawer,
    getThemeMenu,
    getThemeDropdown,
    getThemeModal,
    getThemeNotification,
    getThemeAlert,
    getThemeBadge,
    getThemeAvatar,
    getThemeButton,
    getThemeLink,
    getThemeCode,
    getThemePre,
    getThemeKbd,
    getThemeSamp,
    getThemeVar,
    getThemeMark,
    getThemeDel,
    getThemeIns,
    getThemeSub,
    getThemeSup,
    getThemeSmall,
    getThemeBig,
    getThemeTt,
    getThemeI,
    getThemeB,
    getThemeU,
    getThemeS,
    getThemeQ,
    getThemeBlockquote,
    getThemeOl,
    getThemeUl,
    getThemeLi,
    getThemeDl,
    getThemeDt,
    getThemeDd,
    getThemeFigure,
    getThemeFigcaption,
    getThemeMain,
    getThemeSection,
    getThemeArticle,
    getThemeAside,
    getThemeHeader,
    getThemeFooter,
    getThemeNav,
    getThemeAddress,
    getThemeTime,
    getThemeAbbr,
    getThemeCite,
    getThemeDfn,
    getThemeEm,
    getThemeStrong,
  };
};

export default useThemeUtils; 