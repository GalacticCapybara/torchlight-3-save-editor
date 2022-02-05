"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var platform_folders_1 = __importDefault(require("platform-folders"));
var fileHander_1 = __importDefault(require("../../fileHander"));
var logger_1 = __importDefault(require("../../logger"));
var enums_1 = require("./enums");
function getModule(logger) {
    if (logger === void 0) { logger = logger_1["default"]; }
    return {
        command: "export",
        handler: function (argv) {
            if (!argv["path"]) {
                throw new Error(enums_1.ErrorEnum.pathRequired);
            }
            var frontiersFolder = argv["path"];
            // exporting save game
            var inputFolder = path_1["default"].join(frontiersFolder, fileHander_1["default"].saveGameFolder);
            var saveGameoutputFolder = path_1["default"].join((0, platform_folders_1["default"])("documents"), "torchlight-3-save-editor/saveGame");
            var fileNames = fileHander_1["default"].listAllValidFiles(inputFolder);
            if (!fs_1["default"].existsSync(saveGameoutputFolder)) {
                fs_1["default"].mkdirSync(saveGameoutputFolder, { recursive: true });
            }
            for (var _i = 0, fileNames_1 = fileNames; _i < fileNames_1.length; _i++) {
                var fileName = fileNames_1[_i];
                var content = fileHander_1["default"].getContent(path_1["default"].join(inputFolder, fileName));
                fs_1["default"].writeFileSync(path_1["default"].join(saveGameoutputFolder, fileName.replace(".sav", ".json")), JSON.stringify(JSON.parse(content), null, 2));
            }
            var assetsFiles = [
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
            var gameAssetsoutputFolder = path_1["default"].join((0, platform_folders_1["default"])("documents"), "torchlight-3-save-editor/gameAssets");
            for (var _a = 0, assetsFiles_1 = assetsFiles; _a < assetsFiles_1.length; _a++) {
                var assetsFile = assetsFiles_1[_a];
                var content = fileHander_1["default"].getFromStaticContent(inputFolder, assetsFile);
                var assetPath = path_1["default"].join(gameAssetsoutputFolder, assetsFile);
                var assetDir = path_1["default"].dirname(assetPath);
                if (!fs_1["default"].existsSync(assetDir)) {
                    fs_1["default"].mkdirSync(assetDir, { recursive: true });
                }
                fs_1["default"].writeFileSync(path_1["default"].join(gameAssetsoutputFolder, assetsFile), content);
            }
        },
        builder: {},
        describe: "Exports the save game as JSON to <documents>/torchlight-3-save-editor"
    };
}
exports["default"] = getModule;
