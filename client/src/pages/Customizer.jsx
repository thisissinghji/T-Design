import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import config from "../config/config/config";
import state from "../store";
import { downloadCanvasToImage, reader } from "../config/config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/config/constants";
import { fadeAnimation, slideAnimation } from "../config/config/motion";
import {
  ColorPicker,
  CustomButton,
  FilePicker,
  Tab,
  TextAdder
} from "../components";

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState("");
  const [showTextAdder, setShowTextAdder] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "textadder":
        return <TextAdder addText={handleTextAddition} />;
      default:
        return null;
    }
  };

  const handleTextAddition = (text) => {
    state.textDecal = text;
    setShowTextAdder(false);
  };

  const handleDecals = (type, result) => {
    if (type === 'logo' || type === 'full') {
      const decalType = DecalTypes[type];
      state[decalType.stateProperty] = result;
      if (!activeFilterTab[decalType.filterTab]) {
        handleActiveFilterTab(decalType.filterTab);
      }
    } else if (type === 'text') {
      state.textDecal = result; // Set the text decal path in the state
    }
  };
  

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // after setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
              
                {generateTabContent()}
                {showTextAdder && <TextAdder addText={handleTextAddition} />}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
            <CustomButton
              type="filled"
              title="Download Image"
              handleClick={downloadCanvasToImage}
              customStyles="w-fit px-4 py-2.5 ml-2 font-bold text-sm mt-4"
            />
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
      
          
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
