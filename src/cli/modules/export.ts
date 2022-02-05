import path from "path";
import fs from "fs";

import getPath from "platform-folders";

import fileHander from "../../fileHander";
import defaultLogger, { LoggerInterface } from "../../logger";
import { ErrorEnum } from "./enums";

function getModule(logger: LoggerInterface = defaultLogger) {
  return {
    command: "export",
    handler: (argv) => {
      if (!argv["path"]) {
        throw new Error(ErrorEnum.pathRequired);
      }

      const frontiersFolder = argv["path"];

      // exporting save game
      const inputFolder = path.join(frontiersFolder, fileHander.saveGameFolder);
      const saveGameoutputFolder = path.join(
        getPath("documents"),
        "torchlight-3-save-editor/saveGame"
      );

      const fileNames = fileHander.listAllValidFiles(inputFolder);

      if (!fs.existsSync(saveGameoutputFolder)) {
        fs.mkdirSync(saveGameoutputFolder, { recursive: true });
      }

      for (let fileName of fileNames) {
        const content = fileHander.getContent(path.join(inputFolder, fileName));
        fs.writeFileSync(
          path.join(saveGameoutputFolder, fileName.replace(".sav", ".json")),
          JSON.stringify(JSON.parse(content), null, 2)
        );
      }

      const assetsFiles = [
        "/Curves/AffixCurves.csv",
        "/Curves/DungeonChallengeCurves.csv",
        "/Curves/EmberWeaponCurves.csv",
        "/Curves/FortPropSpawnCurves.csv",
        "/Curves/ItemSpawnCurves.csv",
        "/Curves/LevelComparisonCurves.csv",
        "/Curves/MonsterCurves.csv",
        "/Curves/PlayerCountCurves.csv",
        "/Curves/PlayerCurves.csv",
        "/Curves/RatioCurves.csv",
        "/Curves/SkillCurves.csv",
        "/DataVersion/version.json",
        "/Spreadsheets/ActiveTraitsTable.csv",
        "/Spreadsheets/AffixSpawnData.csv",
        "/Spreadsheets/AffixTable.csv",
        "/Spreadsheets/AreaTable.csv",
        "/Spreadsheets/BossTable.csv",
        "/Spreadsheets/CatalogTable.csv",
        "/Spreadsheets/CatalogTable.json",
        "/Spreadsheets/CinematicTable.csv",
        "/Spreadsheets/ContractTable.csv",
        "/Spreadsheets/CurrencyTable.csv",
        "/Spreadsheets/DialogueTable.csv",
        "/Spreadsheets/DifficultyTable.csv",
        "/Spreadsheets/DungeonChallengeTable.csv",
        "/Spreadsheets/DungeonSpawnTable.csv",
        "/Spreadsheets/DyeTable.csv",
        "/Spreadsheets/EmberWeaponTable.csv",
        "/Spreadsheets/FoliageSoundTable.csv",
        "/Spreadsheets/FortPropGroupsTable.csv",
        "/Spreadsheets/FortPropSpawnTable.csv",
        "/Spreadsheets/FortPropsTable.csv",
        "/Spreadsheets/ItemModifyTable.csv",
        "/Spreadsheets/ItemQualityTable.csv",
        "/Spreadsheets/ItemSpawnTable.csv",
        "/Spreadsheets/ItemsTable.csv",
        "/Spreadsheets/ItemWardrobe.csv",
        "/Spreadsheets/ItemWardrobeEntryTable.csv",
        "/Spreadsheets/LevelRewardTable.csv",
        "/Spreadsheets/LoadingScreenTable.csv",
        "/Spreadsheets/MapWorksTable.csv",
        "/Spreadsheets/MinionSpawnTable.csv",
        "/Spreadsheets/MinionsTable.csv",
        "/Spreadsheets/MonsterAffixTable.csv",
        "/Spreadsheets/MonsterSpawnTable.csv",
        "/Spreadsheets/MonstersTable.csv",
        "/Spreadsheets/NameSpawnTable.csv",
        "/Spreadsheets/PlayerAffixTable.csv",
        "/Spreadsheets/PlayerTable.csv",
        "/Spreadsheets/ProcTable.csv",
        "/Spreadsheets/QuestObjectTable.csv",
        "/Spreadsheets/RecipeUnitTable.csv",
        "/Spreadsheets/SkillsBalanceTable.csv",
        "/Spreadsheets/SkillsTable.csv",
        "/Spreadsheets/SkillsTabTable.csv",
        "/Spreadsheets/SpokeTable.csv",
        "/Spreadsheets/StatusEffectTable.csv",
        "/Spreadsheets/TermsTargetsTable.csv",
        "/Spreadsheets/TraitDisplayTable.csv",
        "/Spreadsheets/TraitsTable.csv",
        "/Spreadsheets/TrapSpawnTable.csv",
      ];
      const gameAssetsoutputFolder = path.join(
        getPath("documents"),
        "torchlight-3-save-editor/gameAssets"
      );

      for (const assetsFile of assetsFiles) {
        const content = fileHander.getFromStaticContent(
          inputFolder,
          assetsFile
        );
        const assetPath = path.join(gameAssetsoutputFolder, assetsFile);
        const assetDir = path.dirname(assetPath);

        if (!fs.existsSync(assetDir)) {
          fs.mkdirSync(assetDir, { recursive: true });
        }

        fs.writeFileSync(
          path.join(gameAssetsoutputFolder, assetsFile),
          content
        );
      }
    },
    builder: {},
    describe:
      "Exports the save game as JSON to <documents>/torchlight-3-save-editor",
  };
}

export default getModule;
