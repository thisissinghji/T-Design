import { swatch, fileIcon, logoShirt, stylishShirt, textIcon} from "../../assets/assets"

export const EditorTabs = [ //editortabs is an array that represnts tabs in an editor or design tool
  {
    name: "colorpicker", //represents the name of the tab
    icon: swatch, //represents the icon 
  },
  {
    name: "filepicker",
    icon: fileIcon,
  },
  {
    name: "textadder",
    icon: textIcon,
  },
  
];

export const FilterTabs = [
  {
    name: "logoShirt",
    icon: logoShirt,
  },
  {
    name: "stylishShirt",
    icon: stylishShirt,
  },
  
];

export const DecalTypes = {    //represents different types of decals in the editor or design tool.
  logo: {
    stateProperty: "logoDecal", //represents the state property name associated with the decal type.
    filterTab: "logoShirt", // represents the corresponding filter tab name for the decal type.
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};
