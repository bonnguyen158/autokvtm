/**
 * ============================================================================
 * KVTM AGENT - APPSFLYER.JS
 * Auto KVTM Ver 7.0.0
 * 
 * - Mock Appsflyer SDK (Chống crash game & chặn telemetry)
 * - Dual Bridge: ADB File IPC (/sdcard/.../kvtm_cmd.json) & Optional WebSocket
 * - Điều khiển camera nhảy tầng: gv.background.snapFloor() / snapGround()
 * - Bảng ánh xạ vật phẩm (ITEM_MAPPING): Bot Key -> Tên Game & Mã Ảnh
 * - Không đọc/ghi bất kỳ file rác nào vào thẻ nhớ
 * ============================================================================
 */

// 1. MOCK APPSFLYER SDK (Bắt buộc để game không crash và chặn theo dõi ngầm)
!function (global) {
  "use strict";
  var fr = void 0 !== global.fr ? global.fr : {};

  function AppsflyerMock() { }
  AppsflyerMock.prototype.init = function () { return !0; };
  AppsflyerMock.prototype.trackEvent = function () { return !0; };
  AppsflyerMock.prototype.setUserId = function () { return !0; };
  AppsflyerMock.prototype.logEvent = function () { return !0; };
  AppsflyerMock.prototype.trackPurchase = function () { return !0; };
  AppsflyerMock.prototype.trackCustomEvent = function () { return !0; };
  AppsflyerMock.prototype.getInstance = function () { return this; };
  AppsflyerMock.getInstance = function () { return fr.appsflyer; };

  fr.appsflyer = new AppsflyerMock();
  fr.Appsflyer = AppsflyerMock;
  global.fr = fr;
  global.Appsflyer = AppsflyerMock;
}("undefined" != typeof window ? window : "undefined" != typeof global ? global : this);

// 2. BẢNG ÁNH XẠ VẬT PHẨM (MAPPING BOT KEY -> TÊN GAME & MÃ ẢNH)
var ITEM_MAPPING = {

  // --- CÂY TRỒNG / NÔNG SẢN ---
  "kho_cay_hong": {
    "ten_game": "Hoa Hồng",
    "ma_anh": "plant_01_red_rose.png"
  },
  "kho_cay_tao": {
    "ten_game": "Táo",
    "ma_anh": "plant_02_apple.png"
  },
  "kho_cay_bong": {
    "ten_game": "Cây Bông",
    "ma_anh": "plant_03_cotton.png"
  },
  "kho_cay_tuyet": {
    "ten_game": "Hoa Tuyết",
    "ma_anh": "plant_04_snowflakes.png"
  },
  "kho_cay_oai": {
    "ten_game": "Hoa Oải Hương",
    "ma_anh": "plant_05_lavender.png"
  },
  "kho_cay_dua": {
    "ten_game": "Quả Dừa",
    "ma_anh": "plant_06_coconut.png"
  },
  "kho_cay_chanh": {
    "ten_game": "Quả Chanh",
    "ma_anh": "plant_07_lemon.png"
  },
  "kho_dua_hau": {
    "ten_game": "Dưa Hấu",
    "ma_anh": "plant_08_water_melon.png"
  },
  "kho_cay_tra": {
    "ten_game": "Lá Trà",
    "ma_anh": "plant_09_tea.png"
  },
  "kho_cay_mit": {
    "ten_game": "Quả Mít",
    "ma_anh": "plant_10_jackfruit.png"
  },
  "kho_cay_thom": {
    "ten_game": "Quả Dứa",
    "ma_anh": "plant_11_pineapple.png"
  },
  "kho_cay_xoai": {
    "ten_game": "Xoài",
    "ma_anh": "plant_12_mango.png"
  },
  "kho_cay_nho": {
    "ten_game": "Nho",
    "ma_anh": "plant_13_grapes.png"
  },
  "kho_cay_lai": {
    "ten_game": "Hoa Lài",
    "ma_anh": "plant_14_jasmine.png"
  },
  "kho_cay_cuc": {
    "ten_game": "Hoa Cúc",
    "ma_anh": "plant_15_daisy.png"
  },
  "kho_cay_bi": {
    "ten_game": "Hoa Bi",
    "ma_anh": "plant_16_baby.png"
  },
  "kho_cay_sen": {
    "ten_game": "Hoa Sen",
    "ma_anh": "plant_17_lotus.png"
  },
  "kho_cay_huongduong": {
    "ten_game": "Hoa Hướng Dương",
    "ma_anh": "plant_18_sunflower.png"
  },
  "kho_cay_vietquat": {
    "ten_game": "Việt Quất",
    "ma_anh": "plant_19_blueberry.png"
  },
  "kho_cay_dau_tay": {
    "ten_game": "Dâu Tây",
    "ma_anh": "plant_20_strawberry.png"
  },
  // --- NÔNG SẢN SẤY ---
  "kho_hong_say": {
    "ten_game": "Hồng Sấy",
    "ma_anh": "item_dryer_rose.png"
  },
  "kho_tao_say": {
    "ten_game": "Táo Sấy",
    "ma_anh": "item_dryer_apple.png"
  },
  "kho_oai_huong_say": {
    "ten_game": "Oải Hương Sấy",
    "ma_anh": "item_dryer_lavender.png"
  },
  "kho_dua_say": {
    "ten_game": "Dừa Sấy",
    "ma_anh": "item_dryer_coconut.png"
  },
  "kho_hat_dua_hau": {
    "ten_game": "Hạt Dưa Sấy",
    "ma_anh": "item_dryer_water_melon.png"
  },
  "kho_tra_say": {
    "ten_game": "Trà Sấy",
    "ma_anh": "item_dryer_tea.png"
  },
  "kho_mit_say": {
    "ten_game": "Mít Sấy",
    "ma_anh": "item_dryer_jackfruit.png"
  },
  "kho_thom_say": {
    "ten_game": "Dứa Sấy",
    "ma_anh": "item_dryer_pineapple.png"
  },
  "kho_xoai_say": {
    "ten_game": "Xoài Sấy",
    "ma_anh": "item_dryer_mango.png"
  },
  "kho_lai_say": {
    "ten_game": "Lài Sấy",
    "ma_anh": "item_dryer_jasmine.png"
  },
  "kho_cuc_say": {
    "ten_game": "Cúc Sấy",
    "ma_anh": "item_dryer_daisy.png"
  },
  "kho_sen_say": {
    "ten_game": "Hạt Sen",
    "ma_anh": "item_dryer_lotus_seed.png"
  },
  "kho_nho_say": {
    "ten_game": "Nho Sấy",
    "ma_anh": "item_dryer_grapes.png"
  },
  "kho_huongduong_say": {
    "ten_game": "Hạt Hướng Dương",
    "ma_anh": "item_dryer_sunflower.png"
  },
  "kho_vietquat_say": {
    "ten_game": "Việt Quất Sấy",
    "ma_anh": "item_dryer_blueberry.png"
  },
  // --- NƯỚC ÉP & SINH TỐ ---
  "kho_nuoc_tao": {
    "ten_game": "Nước Táo",
    "ma_anh": "item_juice_apple.png"
  },
  "kho_nuoc_tuyet": {
    "ten_game": "Nước Tinh Khiết",
    "ma_anh": "item_juice_water.png"
  },
  "kho_nuoc_dua": {
    "ten_game": "Nước Dừa",
    "ma_anh": "item_juice_coconut.png"
  },
  "kho_nuoc_chanh": {
    "ten_game": "Nước Chanh",
    "ma_anh": "item_juice_lemon.png"
  },
  "kho_nuoc_dua_hau": {
    "ten_game": "Nước Dưa Hấu",
    "ma_anh": "item_juice_water_melon.png"
  },
  "kho_nuoc_mit": {
    "ten_game": "Sinh Tố Mít",
    "ma_anh": "item_juice_jackfruit.png"
  },
  "kho_nuoc_thom": {
    "ten_game": "Nước Dứa",
    "ma_anh": "item_juice_pineapple.png"
  },
  "kho_sinh_to_xoai": {
    "ten_game": "Sinh Tố Xoài",
    "ma_anh": "item_juice_mango.png"
  },
  "kho_nuoc_nho": {
    "ten_game": "Nước Nho",
    "ma_anh": "item_juice_grapes.png"
  },
  "kho_nuoc_vietquat": {
    "ten_game": "Nước Việt Quất",
    "ma_anh": "item_juice_blueberry.png"
  },
  "kho_nuoc_dau": {
    "ten_game": "Nước Dâu",
    "ma_anh": "item_juice_strawberry.png"
  },
  // --- VẢI ---
  "kho_vai_do": {
    "ten_game": "Vải Đỏ",
    "ma_anh": "item_looms_red.png"
  },
  "kho_vai_vang": {
    "ten_game": "Vải Vàng",
    "ma_anh": "item_looms_yellow.png"
  },
  "kho_vai_tim": {
    "ten_game": "Vải Tím",
    "ma_anh": "item_looms_violet.png"
  },
  "kho_vai_xanh": {
    "ten_game": "Vải Xanh Lá",
    "ma_anh": "item_looms_green.png"
  },
  "kho_vai_trang": {
    "ten_game": "Vải Trắng",
    "ma_anh": "item_looms_white.png"
  },
  "kho_vai_hong": {
    "ten_game": "Vải Hồng",
    "ma_anh": "item_looms_pink.png"
  },
  "kho_vai_den": {
    "ten_game": "Vải Đen",
    "ma_anh": "item_looms_black.png"
  },
  "kho_vai_xanh_bien": {
    "ten_game": "Vải Xanh Biển",
    "ma_anh": "item_looms_navy.png"
  },
  // --- NGỌC / ĐÁ QUÝ ---
  "kho_da_do": {
    "ten_game": "Ngọc Đỏ",
    "ma_anh": "item_gems_red.png"
  },
  "kho_da_xb": {
    "ten_game": "Ngọc Xanh Biển",
    "ma_anh": "item_gems_navy.png"
  },
  "kho_da_vang": {
    "ten_game": "Ngọc Vàng",
    "ma_anh": "item_gems_yellow.png"
  },
  "kho_da_tim": {
    "ten_game": "Ngọc Tím",
    "ma_anh": "item_gems_violet.png"
  },
  "kho_ngoc_cam": {
    "ten_game": "Ngọc Cam",
    "ma_anh": "item_gems_orange.png"
  },
  "kho_da_xl": {
    "ten_game": "Ngọc Xanh Lá",
    "ma_anh": "item_gems_green.png"
  },
  "kho_da_cv": {
    "ten_game": "Ngọc Cầu Vồng",
    "ma_anh": "item_gems_rainbow.png"
  },
  // --- TINH DẦU ---
  "kho_tinh_dau_hh": {
    "ten_game": "Tinh Dầu Hoa Hồng",
    "ma_anh": "item_oil_rose.png"
  },
  "kho_tinh_dau_tao": {
    "ten_game": "Tinh Dầu Táo",
    "ma_anh": "item_oil_apple.png"
  },
  "kho_tinh_dau_oai": {
    "ten_game": "Tinh Dầu Oải Hương",
    "ma_anh": "item_oil_lavender.png"
  },
  "kho_tinh_dau_dua": {
    "ten_game": "Tinh Dầu Dừa",
    "ma_anh": "item_oil_coconut.png"
  },
  "kho_tinh_dau_chanh": {
    "ten_game": "Tinh Dầu Chanh",
    "ma_anh": "item_oil_lemon.png"
  },
  "kho_tinh_dau_sen": {
    "ten_game": "Tinh Dầu Sen",
    "ma_anh": "item_oil_lotus.png"
  },
  "kho_td_vq": {
    "ten_game": "Tinh Dầu Việt Quất",
    "ma_anh": "item_oil_blueberry.png"
  },
  "kho_td_dau": {
    "ten_game": "Tinh Dầu Dâu",
    "ma_anh": "item_oil_strawberry.png"
  },
  // --- TRÀ ---
  "kho_tra_hoa_hong": {
    "ten_game": "Trà Hoa Hồng",
    "ma_anh": "item_tea_rose.png"
  },
  "kho_tra_da": {
    "ten_game": "Trà Đá",
    "ma_anh": "item_tea_tea.png"
  },
  "kho_tra_tao": {
    "ten_game": "Trà Táo",
    "ma_anh": "item_tea_apple.png"
  },
  "kho_tra_chanh": {
    "ten_game": "Trà Chanh",
    "ma_anh": "item_tea_lemon.png"
  },
  "kho_tra_nho": {
    "ten_game": "Trà Nho",
    "ma_anh": "item_tea_grapes.png"
  },
  "kho_tra_cuc": {
    "ten_game": "Trà Hoa Cúc",
    "ma_anh": "item_tea_jasmine.png"
  },
  "kho_tra_sen": {
    "ten_game": "Trà Sen",
    "ma_anh": "item_tea_lotus.png"
  },
  "kho_tra_vietquat": {
    "ten_game": "Trà Việt Quất",
    "ma_anh": "item_tea_blueberry.png"
  },
  "kho_tra_trai_cay": {
    "ten_game": "Trà Trái Cây",
    "ma_anh": "item_tea_fruit.png"
  },
  // --- BÓ HOA ---
  "kho_bo_hong": {
    "ten_game": "Bó Hồng",
    "ma_anh": "item_flower_rose.png"
  },
  "kho_bo_oai": {
    "ten_game": "Bó Oải Hương",
    "ma_anh": "item_flower_lavender.png"
  },
  "kho_bo_cuc": {
    "ten_game": "Bó Cúc",
    "ma_anh": "item_flower_daisy.png"
  },
  "kho_bo_huongduong": {
    "ten_game": "Bó Hướng Dương",
    "ma_anh": "item_flower_sunflower.png"
  },
  "kho_bo_sen": {
    "ten_game": "Bó Sen",
    "ma_anh": "item_flower_lotus.png"
  },
  "kho_bo_lai": {
    "ten_game": "Bó Lài",
    "ma_anh": "item_flower_jasmine.png"
  },
  // --- NƯỚC HOA ---
  "kho_nuoc_hoa_hong": {
    "ten_game": "Nước Hoa Hồng",
    "ma_anh": "item_perfume_rose.png"
  },
  "kho_nuoc_hoa_tao": {
    "ten_game": "Nước Hoa Hương Táo",
    "ma_anh": "item_perfume_apple.png"
  },
  "kho_nuoc_hoa_oai": {
    "ten_game": "Nước Hoa Oải Hương",
    "ma_anh": "item_perfume_lavender.png"
  },
  "kho_nuoc_hoa_chanh": {
    "ten_game": "Nước Hoa Hương Chanh",
    "ma_anh": "item_perfume_lemon.png"
  },
  "kho_nuoc_hoa_vietquat": {
    "ten_game": "Nước Hoa Việt Quất",
    "ma_anh": "item_perfume_blueberry.png"
  },
  "kho_nuoc_hoa_sen": {
    "ten_game": "Nước Hoa Hương Sen",
    "ma_anh": "item_perfume_lotus.png"
  },
  "kho_nuoc_hoa_dau": {
    "ten_game": "Nước Hoa Hương Dâu",
    "ma_anh": "item_perfume_strawberry.png"
  },
  // --- TÚI HƯƠNG ---
  "kho_tui_hong": {
    "ten_game": "Túi Hoa Hồng",
    "ma_anh": "item_aromatic_rose.png"
  },
  "kho_tui_tao": {
    "ten_game": "Túi Hương Táo",
    "ma_anh": "item_aromatic_apple.png"
  },
  "kho_tui_oai": {
    "ten_game": "Túi Oải Hương",
    "ma_anh": "item_aromatic_lavender.png"
  },
  "kho_tui_chanh": {
    "ten_game": "Túi Hương Chanh",
    "ma_anh": "item_aromatic_lemon.png"
  },
  "kho_tui_vietquat": {
    "ten_game": "Túi Việt Quất",
    "ma_anh": "item_aromatic_blueberry.png"
  },
  "kho_tui_sen": {
    "ten_game": "Túi Hương Sen",
    "ma_anh": "item_aromatic_lotus.png"
  },
  // --- THỜI TRANG & MAY MẶC (SEWING) ---
  "khan_do": {
    "ten_game": "Khăn Đỏ",
    "ma_anh": "item_sewing_silk.png"
  },
  "dam_bach_tuyet": {
    "ten_game": "Đầm Bạch Tuyết",
    "ma_anh": "item_sewing_dress.png"
  },
  "tham_bay": {
    "ten_game": "Thảm Bay",
    "ma_anh": "item_sewing_carpet.png"
  },
  "non_ba_tuoc": {
    "ten_game": "Nón Bá Tước",
    "ma_anh": "item_sewing_hat.png"
  },
  "no_cong_chua": {
    "ten_game": "Nơ Công Chúa",
    "ma_anh": "item_sewing_hairpin.png"
  },
  "tui_chuot_chu": {
    "ten_game": "Túi Chuột Chù",
    "ma_anh": "item_sewing_bag.png"
  },
  "ao_choang": {
    "ten_game": "Áo Choàng",
    "ma_anh": "item_sewing_coat.png"
  },
  "giay_di_hia": {
    "ten_game": "Giày Đi Hia",
    "ma_anh": "item_sewing_shoes.png"
  },
  // --- VẬT TƯ NÂNG KHO ---
  "gach": {
    "ten_game": "Gạch",
    "ma_anh": "item_material_brick.png"
  },
  "go": {
    "ten_game": "Gỗ",
    "ma_anh": "item_material_wood.png"
  },
  "dinh": {
    "ten_game": "Đinh",
    "ma_anh": "item_material_nail.png"
  },
  "ngoi": {
    "ten_game": "Ngói",
    "ma_anh": "item_material_tile.png"
  },
  "son_do": {
    "ten_game": "Sơn Đỏ",
    "ma_anh": "item_material_paint_red.png"
  },
  "son_vang": {
    "ten_game": "Sơn Vàng",
    "ma_anh": "item_material_paint_yellow.png"
  },
  "son_tim": {
    "ten_game": "Sơn Tím",
    "ma_anh": "item_material_paint_violet.png"
  },
  "son_den": {
    "ten_game": "Sơn Đen",
    "ma_anh": "item_material_paint_black.png"
  },
  "da": {
    "ten_game": "Đá",
    "ma_anh": "item_material_stone.png"
  },
  "sat": {
    "ten_game": "Sắt",
    "ma_anh": "item_material_iron.png"
  },
  "thep": {
    "ten_game": "Thép",
    "ma_anh": "item_material_steel.png"
  },
  "bua": {
    "ten_game": "Búa",
    "ma_anh": "item_material_hammer.png"
  },
  // --- KHO 3: VẬT DỤNG ---
  "nuoc_than": {
    "ten_game": "Nước Thần",
    "ma_anh": "item_magic_water.png"
  },
  "keo_dan_may": {
    "ten_game": "Keo Dán Mây",
    "ma_anh": "item_magic_glue.png"
  },
  // --- KHO 3: VỢT BẮT BỌ ---
  "vot_trang": {
    "ten_game": "Vợt Trắng",
    "id": "M20",
    "ma_anh": "item_bug_net_gold.png"
  },
  "vot_xanh": {
    "ten_game": "Vợt Xanh",
    "id": "M21",
    "ma_anh": "item_bug_net_green.png"
  },
  // --- KHO 2: CÁC LOẠI BỌ (id = khóa bảng g_PEST của game, KHÔNG theo thứ tự tên ảnh; đã đối chiếu live) ---
  "bug_01_red": {
    "ten_game": "Bọ Rùa",
    "id": "B0"
  },
  "bug_02_blue": {
    "ten_game": "Ốc Sên",
    "id": "B2"
  },
  "bug_03_yellow": {
    "ten_game": "Đom Đóm",
    "id": "B1"
  },
  "bug_04_oragne": {
    "ten_game": "Chuồn Chuồn",
    "id": "B3"
  },
  "bug_05_violet": {
    "ten_game": "Ong",
    "id": "B5"
  },
  "bug_06_pink": {
    "ten_game": "Bướm",
    "id": "B4"
  },
  "bug_07_green": {
    "ten_game": "Sâu Xanh",
    "id": "B6"
  },
  // --- KHO 4: THỎI ĐÚC ---
  "thoi_dong": {
    "ten_game": "Thỏi Đồng",
    "ma_anh": "item_miner_bronze.png"
  },
  "thoi_bac": {
    "ten_game": "Thỏi Bạc",
    "ma_anh": "item_miner_silver.png"
  },
  "thoi_vang": {
    "ten_game": "Thỏi Vàng",
    "ma_anh": "item_miner_gold.png"
  },
  "thoi_bach_kim": {
    "ten_game": "Thỏi Bạch Kim",
    "ma_anh": "item_miner_platinum.png"
  },

  // --- VẬT PHẨM SỰ KIỆN / CÁM (KHO 5 & VPSK) ---
  "vpsk-ga": {
    "id": "E6FD1",
    "ten_game": "Thức ăn cho gà",
    "ma_anh": "vpsk-ga.png"
  },
  "vpsk-heo": {
    "id": "E6FD2",
    "ten_game": "Thức ăn cho heo",
    "ma_anh": "vpsk-heo.png"
  },
  "vpsk-bo": {
    "id": "E6FD3",
    "ten_game": "Thức ăn cho bò",
    "ma_anh": "vpsk-bo.png"
  },
  "vpsk-cuu": {
    "id": "E6FD4",
    "ten_game": "Thức ăn cho cừu",
    "ma_anh": "vpsk-cuu.png"
  },
  "vpsk_dua": {
    "id": "E2T3",
    "ten_game": "DỪA TƯƠI",
    "ma_anh": "vpsk_dua.png"
  },
  "vpsk_kem": {
    "id": "E2T1",
    "ten_game": "QUE KEM",
    "ma_anh": "vpsk_kem.png"
  },
  "vpsk_kinh": {
    "id": "E2T2",
    "ten_game": "KÍNH MÁT",
    "ma_anh": "vpsk_kinh.png"
  }
};
// 3. AGENT BRIDGE & CAMERA JUMP CONTROLLER
(function (global) {
  "use strict";

  var ws = null;
  var reconnectTimer = null;
  var wsOpenedAt = 0, wsLastRx = 0, wsPongSeen = false, wsStartedAt = 0;

  // WebSocket ho tro nguoc (khong bat buoc)
  function initWebSocket() {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    try {
      if (typeof WebSocket === "undefined") return;
      var cur = new WebSocket("ws://127.0.0.1:8765");
      ws = cur;
      wsStartedAt = Date.now(); wsOpenedAt = 0; wsLastRx = Date.now(); wsPongSeen = false;
      ws.onopen = function () {
        if (ws !== cur) return;
        wsOpenedAt = Date.now(); wsLastRx = wsOpenedAt;
        // Tu khai bao danh tinh: doc token do Python ghi truc tiep vao DUNG may ao nay qua adb -s <serial>
        var token = "";
        try {
          var idPaths = ["/sdcard/Android/data/vn.kvtm.js/files/kvtm_id.txt", "/sdcard/kvtm_id.txt"];
          for (var ii = 0; ii < idPaths.length && !token; ii++) {
            if (jsb.fileUtils.isFileExist(idPaths[ii])) {
              token = String(jsb.fileUtils.getStringFromFile(idPaths[ii]) || "").trim();
            }
          }
        } catch (eId) { }
        try { ws.send(JSON.stringify({ cmd: "IDENTIFY", device_id: token })); } catch (eS) { }
        try { ws.send(JSON.stringify({ cmd: "PING" })); } catch (eP) { }
        if (typeof cc !== "undefined" && cc.log) {
          cc.log("[KVTMAgent] WS connected, identify=" + token);
        }
      };

      ws.onmessage = function (event) {
        try {
          var msg = JSON.parse(event.data);
          if (!msg) return;
          wsLastRx = Date.now();
          if (msg.cmd === "PONG") { wsPongSeen = true; return; }
          var res = dispatchCommand(msg);
          if (res && res.__async) return;
          if (ws && ws.readyState === 1) {
            ws.send(JSON.stringify(res));
          }
        } catch (e) { }
      };
      ws.onerror = function () { };
      ws.onclose = function () { if (ws !== cur) return; ws = null; reconnectTimer = setTimeout(initWebSocket, 3000); };
    } catch (e) { reconnectTimer = setTimeout(initWebSocket, 3000); }
  }

  // ==========================================================================
  // DISPATCHER - XU LY LENH TU PYTHON (DUNG CHUNG CHO CA FILE IPC VA SOCKET)
  // ==========================================================================
  // ==========================================================================
  // BUG ENGINE - BAT BO NHA BAN (goi ham goc CloudFloorSlot.onCatchBug cho tung o)
  // Khong hook, khong gui goi tu che: game tu tru vot, cong bo, xoa hinh bo va gui RequestFriendBugCatch.
  // ==========================================================================
  var BugEngine = {
    scan: function () {
      var o = { success: false };
      try {
        o.isFriend = !!Game.isFriendGarden();
        o.friendId = GardenManager.nextUserId;
        o.friendName = GardenManager.nextUserName;
        var fb = GardenManager.friendBugs;
        o.friendBugs = (fb === null || fb === undefined) ? null : fb;
        try { o.M21 = Number(gv.userStorages.getItemAmount("M21")) || 0; } catch (e) { o.M21 = null; }
        o.stock = {};
        for (var i = 0; i <= 6; i++) {
          try { o.stock["B" + i] = Number(gv.userStorages.getItemAmount("B" + i)) || 0; } catch (e) { o.stock["B" + i] = null; }
        }
        var cells = [];
        var sl = CloudFloors.slots;
        for (var f = 0; f < sl.length; f++) {
          var row = sl[f];
          if (!row) continue;
          for (var k = 0; k < 8; k++) {
            var c = row[k];
            if (c && typeof c.hasBug === "function" && c.hasBug()) {
              cells.push({ f: f + 1, o: k + 1, id: c.slotData ? c.slotData[4] : null });
            }
          }
        }
        o.cells = cells;
        o.success = true;
      } catch (e) {
        o.reason = String(e);
      }
      return o;
    },
    catchCell: function (f, slotNum) {
      try {
        if (!Game.isFriendGarden()) return { success: false, reason: "not_friend" };
        var row = CloudFloors.slots[f - 1];
        var cell = row ? row[slotNum - 1] : null;
        if (!cell || typeof cell.hasBug !== "function" || !cell.hasBug()) return { success: false, reason: "nobug" };
        var dw = new ccui.Widget();
        var lb = new cc.LabelTTF("x", "Arial", 12);
        lb.setName("amount");
        dw.addChild(lb);
        if (!FWUI.getChildByName(dw, "amount")) return { success: false, reason: "nofake" };
        cell.catchBugSlots = [];
        cell.catchBugTimes = [];
        var r = cell.onCatchBug(dw, { owner: cell });
        try { cell.onFinishedCatchingBug(dw); } catch (e2) {}
        return { success: !!r, ret: r };
      } catch (e) {
        return { success: false, reason: String(e) };
      }
    }
  };


  // ==========================================================================
  // CHEST ENGINE - MO RUONG GO (C1) BANG HAM UI GOC CUA GAME
  // Moi lenh nho, tra ket qua ngay (khong tu cho). Python tu cho theo trang thai that:
  // win / left / opening / anim / tab ... nen may lag chi cho lau hon, khong nhay buoc.
  // Khong goi bat ky ham nao cua tab Than Den (ton kim cuong).
  // ==========================================================================
  var ChestEngine = {
    status: function () {
      var o = { success: false };
      try {
        var c = gv.chest.getChest("C1");
        var t = Game.getGameTimeInSeconds();
        var p = gv.chestPopup;
        o.win = c[12];
        o.left = Math.round(c[6] - t);
        o.price = c[8];
        if (c[12] >= 0 && c[9] && c[9][c[12]]) {
          var w = c[9][c[12]];
          o.winItem = w[10];
          o.winAmt = w[11];
          try { o.canReceive = Game.canReceiveGift([{ itemId: w[10], amount: w[11] }], false); } catch (eC) { o.canReceive = null; }
        }
        o.popShow = !!p.isShow;
        o.opening = !!p.isChestOpening;
        o.tab = p.currentTab;
        o.anyPopup = !!Game.isAnyPopupShowing();
        o.friend = !!Game.isFriendGarden();
        o.anim = (p.effectChest && p.effectChest.spine) ? String(p.effectChest.spine.animation) : null;
        o.effVisible = !!(p.panelEffect && p.panelEffect.isVisible && p.panelEffect.isVisible() && p.panelEffect.getOpacity() > 0);
        o.success = true;
      } catch (e) { o.reason = String(e); }
      return o;
    },
    run: function (op) {
      try {
        var p = gv.chestPopup;
        if (op === "STATUS") return this.status();
        if (op === "OPEN_POPUP") { gv.chest.showPopup(); return { success: true }; }
        if (op === "TAB_CHEST") {
          if (p.currentTab !== 0) p.showTabChest();
          return { success: true, tab: p.currentTab };
        }
        if (op === "SELECT") {
          p._selectedChestId = "";
          p.updateSelectedChest("C1");
          return { success: true };
        }
        if (op === "CLICK_OPEN") {
          var c = gv.chest.getChest("C1");
          var w = p.widget && p.widget._buttonOpenFree;
          if (!c || c[8] !== 0) return { success: false, reason: "price_not_free" };
          if (p.currentTab !== 0) return { success: false, reason: "wrong_tab" };
          if (!w || !w.isVisible()) return { success: false, reason: "button_hidden" };
          p.onButtonOpenTouched(w);
          return { success: true };
        }
        if (op === "TAP") { p.onChestOpen(); return { success: true }; }
        if (op === "RECEIVE") { p.getReward(); return { success: true }; }
        if (op === "CLEAN_EFFECT") {
          // Dọn hiệu ứng mở rương còn kẹt (panel quà, pháo hoa, rương spine). Game tự dọn bằng hideReward
          // nhưng chỉ khi popup còn mở, nên bot đóng popup sớm thì phải dọn tay để lần mở sau không bị lỗi hình.
          var pe = p.panelEffect;
          if (pe) {
            try { pe.stopAllActions(); } catch (e1) { }
            try { if (pe._panelRewards) pe._panelRewards.setVisible(false); } catch (e2) { }
            try { pe.setVisible(false); pe.setOpacity(0); } catch (e3) { }
          }
          try { if (p.effectParticle) { p.effectParticle.stopSystem(); p.effectParticle.setVisible(false); } } catch (e4) { }
          try { if (p.effectChest) { p.effectChest.removeEventListener(); p.effectChest.resetAnimation(); } } catch (e5) { }
          p.isChestOpening = false;
          delete p._cacheSelectedOpenChest;
          return { success: true };
        }
        if (op === "DESTROY") {
          // Giống code mẫu (đóng widget bằng FWUI.hideWidget): gỡ hẳn popup để lần mở sau dựng mới, không đè hình cũ.
          try { p.hide(); } catch (e0) { }
          if (typeof FWUI !== "undefined" && typeof FWUI.hideWidget === "function") FWUI.hideWidget(p);
          return { success: true };
        }
        if (op === "CLOSE") { p.hide(); return { success: true }; }
        if (op === "CLOSE_POPUPS") { Game.hideAllShowingPopup(); return { success: true }; }
        return { success: false, reason: "unknown_op" };
      } catch (e) { return { success: false, reason: String(e) }; }
    }
  };

  // ===== ORDER ENGINE: Giao Cú bằng hàm UI gốc của game (mở bảng -> chọn ô -> giao/xoá -> đóng bảng) =====
  var OrderEngine = {
    _um: function () {
      try { return (typeof UserOrder !== "undefined" && typeof UserOrder.getInstance === "function") ? UserOrder.getInstance() : null; } catch (e) { return null; }
    },
    _find: function (u, id) {
      var a = u._orders || [];
      for (var i = 0; i < a.length; i++) { if (a[i] && a[i].id == id) return { o: a[i], i: i }; }
      return null;
    },
    // Cú rảnh = id nằm trong availableOwls và chưa có đơn đang giao (orders[id])
    _owl: function (u) {
      var m = u._owlManager, free = [], all = [];
      var ids = Object.keys((m && m.availableOwls) || {});
      for (var i = 0; i < ids.length; i++) {
        all.push(ids[i]);
        if (!m.orders || !m.orders[ids[i]]) free.push(ids[i]);
      }
      return { free: free, all: all };
    },
    run: function (op, id) {
      try {
        var u = this._um();
        if (!u) return { success: false, reason: "no_order_mgr" };

        if (op === "STATUS") {
          var o = { success: true };
          o.friend = !!Game.isFriendGarden();
          o.ui = !!u._orderUI;
          o.loaded = !!u._isDataLoaded;
          try { u._updateOrderRequires(); } catch (e0) { }
          var plants = (typeof g_PLANT !== "undefined") ? g_PLANT : {};
          o.orders = [];
          var arr = u._orders || [];
          for (var i = 0; i < arr.length; i++) {
            var x = arr[i];
            if (!x) continue;
            var rq = [], rs = x.requires || [];
            for (var k = 0; k < rs.length; k++) {
              rq.push({ i: rs[k].itemId, c: rs[k].count, r: rs[k].require, p: plants[rs[k].itemId] !== undefined });
            }
            o.orders.push({ i: i, id: x.id, type: x.type, st: x.status, paid: !!x.isPaid, ap: x.activePrice || 0, ok: !!u.isOrderEnough(x.id, false), rq: rq });
          }
          var ow = this._owl(u);
          o.owlFree = ow.free;
          o.owlAll = ow.all;
          o.recv = u._receivedDailyOrders;
          o.maxFree = u._maxDailyFreeOrders;
          return o;
        }
        if (op === "OWL") { var w = this._owl(u); return { success: true, free: w.free, all: w.all }; }
        if (op === "HAS") { return { success: true, has: !!this._find(u, id) }; }
        if (op === "OPEN") {
          if (!u._orderUI) u.showOrderUI();
          return { success: !!u._orderUI, ui: !!u._orderUI, reason: u._orderUI ? undefined : "not_opened" };
        }
        if (op === "CLOSE") {
          if (u._orderUI) u.hideOrderUI();
          return { success: true, ui: !!u._orderUI };
        }
        if (op === "DELIVER" || op === "CANCEL") {
          var f = this._find(u, id);
          if (!f) return { success: false, reason: "no_order" };
          var d = f.o;
          if (d.status !== 1) return { success: false, reason: "bad_status" };
          if (d.type === 4) return { success: false, reason: "ultraspeed" };
          var ui = u._orderUI;
          if (!ui) return { success: false, reason: "no_ui" };
          if (op === "CANCEL") {
            // chỉ xoá đơn thường (đơn ngày/siêu tốc game hỏi xác nhận hoặc tốn KC)
            if (d.type !== 1) return { success: false, reason: "type_not_allowed" };
          } else {
            if (d.type === 3 && (d.isPaid || (d.activePrice || 0) > 0)) return { success: false, reason: "paid" };
            if (!u._owlManager.canDeliver()) return { success: false, reason: "no_owl" };
            u._updateOrderRequires();
            if (!u.isOrderEnough(d.id, false)) return { success: false, reason: "not_enough" };
            var rq2 = d.requires || [], pl = (typeof g_PLANT !== "undefined") ? g_PLANT : {};
            for (var j = 0; j < rq2.length; j++) {
              // giao hết sạch 1 loại cây thì game bung popup cảnh báo -> không giao
              if (pl[rq2[j].itemId] !== undefined && rq2[j].count <= rq2[j].require) return { success: false, reason: "plant_empty" };
            }
          }
          u._selectedOrderIdx = f.i;
          ui.setSelected(f.i);
          var cb = (op === "DELIVER") ? ui._deliverCallback : ui._cancelCallback;
          if (typeof cb !== "function") return { success: false, reason: "no_callback" };
          cb.call(ui, d.id);
          return { success: true };
        }
        return { success: false, reason: "unknown_op" };
      } catch (e) { return { success: false, reason: String(e) }; }
    }
  };

  // ===== PopupEngine: quet popup dang hien + goi ham xu ly cua nut (nhu nguoi dung bam) =====
  var PopupEngine = {
    // Giao dien nen co dinh, khong bao gio coi la popup
    IGN: ["uiMarquee", "uiOverlayWarning", "uiTutorialNew", "uiBackground"],
    // Nut TUYET DOI khong bam (mua / nap / mo khoa / nang cap / bo qua thoi gian / vao su kien ...)
    DENY: /buy|unlock|skip|goto|play|deliver|upgrade|btn_action|pay/i,
    _key: function (c) {
      var k = c.poolKey;
      if (k === undefined || k === null) return null;
      return String(k).replace("common/ui/", "").replace(".ExportJson", "");
    },
    _texts: function (n, acc, d) {
      if (!n || d > 8 || acc.length > 6) return;
      var s = null;
      try { if (n.getString) s = n.getString(); } catch (e) {}
      if (s && String(s).length > 1 && String(s).length < 60) acc.push(String(s).replace(/\n/g, " "));
      var ch = n.getChildren ? n.getChildren() : [];
      for (var i = 0; i < ch.length; i++) this._texts(ch[i], acc, d + 1);
    },
    _scan: function () {
      var scene = (typeof Game !== "undefined") ? Game.gameScene : null;
      if (!scene) return null;
      var ch = scene.getChildren();
      var out = [];
      for (var i = 0; i < ch.length; i++) {
        try {
          var c = ch[i];
          if (!c.isVisible() || c.isHiding) continue;
          var key = this._key(c);
          if (key === null || this.IGN.indexOf(key) >= 0) continue;
          var cm = c.uiChildMap || {};
          var names = Object.keys(cm);
          var btns = [];
          for (var k = 0; k < names.length; k++) {
            var nm = names[k];
            if (/btn|button|close/i.test(nm)) {
              var v = true;
              try { v = cm[nm].isVisible(); } catch (e) {}
              btns.push({ n: nm, v: v });
            }
          }
          if (!btns.length) continue;
          // HUD chinh (co btnShop + btnOrder) khong phai popup
          if (names.indexOf("btnShop") >= 0 && names.indexOf("btnOrder") >= 0) continue;
          var tx = [];
          this._texts(c, tx, 0);
          out.push({ z: c.getLocalZOrder(), key: key, name: c.getName ? c.getName() : "", btns: btns, tx: tx });
        } catch (e) {}
      }
      out.sort(function (a, b) { return b.z - a.z; });
      return out;
    },
    run: function (op, key, z, btn) {
      try {
        if (op === "SCAN") {
          var l = this._scan();
          if (l === null) return { success: false, reason: "no_scene" };
          return { success: true, popups: l };
        }
        if (op === "PRESS") {
          if (!btn) return { success: false, reason: "no_btn" };
          if (this.DENY.test(btn)) return { success: false, reason: "denied" };
          var scene = (typeof Game !== "undefined") ? Game.gameScene : null;
          if (!scene) return { success: false, reason: "no_scene" };
          var ch = scene.getChildren();
          var w = null;
          for (var i = 0; i < ch.length; i++) {
            var c = ch[i];
            try {
              if (c.isVisible() && !c.isHiding && this._key(c) === key && c.getLocalZOrder() === z && c.uiChildMap && c.uiChildMap[btn]) { w = c; break; }
            } catch (e) {}
          }
          if (!w) return { success: false, reason: "not_found" };
          if (FWUI.hasTouchedUI) return { success: false, reason: "busy_touch" };
          FWUI.onWidgetEvent_touchEnded(w.uiChildMap[btn]);
          return { success: true };
        }
        return { success: false, reason: "unknown_op" };
      } catch (e) { return { success: false, reason: String(e) }; }
    }
  };


  // ==========================================================================
  // FARM ENGINE - GAT / GIEO BANG HAM VUOT GOC CUA GAME (CloudFloorSlot.prototype)
  // Moi lenh la 1 buoc nho dong bo; Python quyet dinh nhip (delay giua cac chau).
  // Game tu gui goi tin, bot khong tu ban goi tin.
  // ==========================================================================
  var FarmEngine = {
    _H: function (F) {
      var S = CloudFloors.slots[F];
      return (S && S[0]) ? S[0] : null;
    },
    _slot: function (F, j) {
      var S = CloudFloors.slots[F];
      return (S && S[j]) ? S[j] : null;
    },
    _potInfo: function (s, j, now) {
      var plant = s.slotData[3];
      if (!plant) return { j: j, plant: "", st: "empty", left: 0 };
      if (s.getPlantState() === 2) return { j: j, plant: plant, st: "ripe", left: 0 };
      var left = Math.ceil((s.plantMatureTime || 0) - now);
      return { j: j, plant: plant, st: "grow", left: left < 0 ? 0 : left };
    },
    status: function (msg) {
      var now = Game.getGameTimeInSeconds();
      var fi = gv.background.floorIndex;
      var last = CloudFloors.getLastUnlockedFloorIdx();
      var out = {
        success: true, friend: !!Game.isFriendGarden(), floorIndex: fi,
        last: last, now: now, floors: []
      };
      if (msg.plant) {
        out.seeds = gv.userStorages.getItemAmount(msg.plant);
      }
      var st = gv.userStorages.getStorage(STORAGE_TYPE_FARM_PRODUCT);
      if (st) out.storage = { cur: st.capacityCurrent, max: st.capacityMax };
      var count = msg.count || 5;
      if (fi < 0) return out; // dang o day, chua o tang nao
      for (var F = fi; F < fi + count && F <= last && F < CloudFloors.slots.length; F++) {
        if (!CloudFloors.isFloorUnlocked(F)) break;
        var S = CloudFloors.slots[F], pots = [];
        for (var j = 0; j < S.length; j++) {
          if (!S[j]) continue;
          pots.push(this._potInfo(S[j], j, now));
        }
        out.floors.push({ f: F, pots: pots });
      }
      return out;
    },
    // Chay ca 1 tang trong game: goi ham game tung chau, nghi `delay` giay giua cac chau (setTimeout),
    // kiem tra tung chau (so chau cho tang khong = kho day / bi chan -> dung ngay), tra loi tre qua reply().
    _running: false, _abort: false,
    runAsync: function (msg, reply) {
      var self = this, op = msg.op, F = msg.floor, arr = msg.slots || [];
      var plant = (op === "PLANT_RUN");
      var delay = Math.max(0, Number(msg.delay) || 0) * 1000;
      var H;
      if (this._running) { reply({ success: false, reason: "busy" }); return; }
      try {
        if (Game.isFriendGarden()) { reply({ success: false, reason: "friend" }); return; }
        H = this._H(F);
      } catch (e0) { reply({ success: false, reason: String(e0) }); return; }
      if (!H) { reply({ success: false, reason: "no_floor" }); return; }
      function getList() { return plant ? H.dropPlantSlots : H.requestHarvestSlots; }
      if (!getList()) { reply({ success: false, reason: "not_started" }); return; }
      if (plant && (!msg.plant || !g_PLANT[msg.plant] || H.dropPlantId !== msg.plant)) { reply({ success: false, reason: "not_started" }); return; }
      this._running = true; this._abort = false;
      var t0 = Date.now(), i = 0, done = 0;
      function fin(reason) {
        self._running = false;
        reply({ success: true, done: done, total: arr.length, reason: reason, stopped_at: (reason && i < arr.length) ? arr[i] : null, ms: Date.now() - t0 });
      }
      function step() {
        try {
          while (true) {
            if (self._abort) return fin("abort");
            if (i >= arr.length) return fin("");
            if (plant && gv.userStorages.getItemAmount(msg.plant) <= 0) return fin("no_seed");
            var s = self._slot(F, arr[i]);
            if (!s) return fin("no_slot");
            var L = getList();
            if (!L) return fin("reset");
            var b = L.length;
            if (plant) H.onDropPlantIdOnPotSlot(msg.plant, s, null); else H.onHarvestSlot(null, s);
            L = getList();
            if (!L || L.length <= b) return fin("blocked");
            done++; i++;
            if (i >= arr.length) return fin("");
            var wait = (t0 + done * delay) - Date.now();
            if (wait > 1) { setTimeout(step, wait); return; }
          }
        } catch (e) { self._running = false; reply({ success: false, reason: String(e) }); }
      }
      step();
    },
    run: function (msg) {
      try {
        var op = msg.op, F = msg.floor, j = msg.slot, H, s;
        if (op === "STATUS") return this.status(msg);
        if (Game.isFriendGarden()) return { success: false, reason: "friend" };
        if (op === "SEEDS") return { success: true, seeds: gv.userStorages.getItemAmount(msg.plant) };
        H = this._H(F);
        if (!H) return { success: false, reason: "no_floor" };
        if (op === "HARVEST_BEGIN") {
          H.onStartHarvesting(null);
          return { success: true };
        }
        if (op === "HARVEST_POT") {
          s = this._slot(F, j);
          if (!s) return { success: false, reason: "no_slot" };
          if (!H.requestHarvestSlots) return { success: false, reason: "not_started" };
          var b1 = H.requestHarvestSlots.length;
          var r1 = H.onHarvestSlot(null, s);
          var a1 = H.requestHarvestSlots.length;
          return { success: true, ok: a1 > b1, ret: r1, pending: a1 };
        }
        if (op === "HARVEST_POTS") {
          if (!H.requestHarvestSlots) return { success: false, reason: "not_started" };
          var arr = msg.slots || [], done = 0;
          for (var q = 0; q < arr.length; q++) {
            var sq = this._slot(F, arr[q]);
            if (!sq) break;
            var bq = H.requestHarvestSlots.length;
            H.onHarvestSlot(null, sq);
            if (H.requestHarvestSlots.length <= bq) break; // khong tang = kho day / bi chan
            done++;
          }
          return { success: true, done: done, total: arr.length };
        }
        if (op === "HARVEST_END") {
          H.onFinishedHarvesting(null);
          return { success: true };
        }
        if (op === "PLANT_BEGIN") {
          if (!msg.plant || !g_PLANT[msg.plant]) return { success: false, reason: "bad_plant" };
          H.dropPlantId = msg.plant;
          H.dropPlantSlots = [];
          H.dropPlantTimeStart = Game.getGameTimeInSeconds();
          return { success: true };
        }
        if (op === "PLANT_POT") {
          s = this._slot(F, j);
          if (!s) return { success: false, reason: "no_slot" };
          if (!msg.plant || !g_PLANT[msg.plant] || H.dropPlantId !== msg.plant || !H.dropPlantSlots) return { success: false, reason: "not_started" };
          var b2 = H.dropPlantSlots.length;
          var r2 = H.onDropPlantIdOnPotSlot(msg.plant, s, null);
          var a2 = H.dropPlantSlots.length;
          return { success: true, ok: a2 > b2, ret: r2, pending: a2, seeds: gv.userStorages.getItemAmount(msg.plant) };
        }
        if (op === "PLANT_POTS") {
          if (!msg.plant || !g_PLANT[msg.plant] || H.dropPlantId !== msg.plant || !H.dropPlantSlots) return { success: false, reason: "not_started" };
          var arr2 = msg.slots || [], done2 = 0;
          for (var w = 0; w < arr2.length; w++) {
            var sw = this._slot(F, arr2[w]);
            if (!sw) break;
            var bw = H.dropPlantSlots.length;
            H.onDropPlantIdOnPotSlot(msg.plant, sw, null);
            if (H.dropPlantSlots.length <= bw) break;
            done2++;
          }
          return { success: true, done: done2, total: arr2.length };
        }
        if (op === "PLANT_END") {
          H.onFinishedDroppingPlantOnPot(H);
          return { success: true };
        }
        return { success: false, reason: "unknown_op" };
      } catch (e) { return { success: false, reason: String(e) }; }
    }
  };

  function dispatchCommand(msg) {
    if (!msg || !msg.cmd) return { success: false, reason: "invalid_cmd" };
    var cmd = msg.cmd;
    var req_id = msg.req_id;

    if (cmd === "PING") {
      return { cmd: "PONG", success: true, req_id: req_id, time: Date.now() };
    } else if (cmd === "JUMP_FLOOR") {
      var ok = jumpToFloor(msg);
      var fOut = (typeof gv !== "undefined" && gv.background) ? ((gv.background.floorIndex < 0) ? 0 : (gv.background.floorIndex + 1)) : (msg.floor !== undefined ? msg.floor : 0);
      return { cmd: "JUMP_FLOOR_RES", success: ok, floor: fOut, req_id: req_id };
    } else if (cmd === "OPEN_SHOP") {
      var ok = openShop();
      return { cmd: "OPEN_SHOP_RES", success: ok, req_id: req_id };
    } else if (cmd === "CLOSE_SHOP") {
      var ok = closeShop();
      return { cmd: "CLOSE_SHOP_RES", success: ok, req_id: req_id };
    } else if (cmd === "SHOP_GET_STATUS") {
      var status = ShopEngine.getStatus();
      return { cmd: "SHOP_GET_STATUS_RES", data: status, req_id: req_id };
    } else if (cmd === "SHOP_COLLECT_MONEY") {
      ShopEngine.collectMoney(msg.slot, function (colRes) {
        try { if (ws && ws.readyState === 1) ws.send(JSON.stringify({ cmd: "SHOP_COLLECT_MONEY_RES", data: colRes, req_id: req_id })); } catch (eM) { }
      });
      return { __async: true };
    } else if (cmd === "SHOP_AD_SLOT") {
      ShopEngine.adSlot(msg.slot, function (adRes) {
        try { if (ws && ws.readyState === 1) ws.send(JSON.stringify({ cmd: "SHOP_AD_SLOT_RES", data: adRes, req_id: req_id })); } catch (eA) { }
      });
      return { __async: true };
    } else if (cmd === "SHOP_CANCEL_SLOT") {
      ShopEngine.cancelSlot(msg.slot, msg.cost, function (canRes) {
        try { if (ws && ws.readyState === 1) ws.send(JSON.stringify({ cmd: "SHOP_CANCEL_SLOT_RES", data: canRes, req_id: req_id })); } catch (eC) { }
      });
      return { __async: true };
    } else if (cmd === "SHOP_PUT_ITEM") {
      ShopEngine.putItem(msg.slot, msg.itemKey, msg.qty, msg.priceMode, msg.price, msg.isAd, msg.minKeepStock, function (putRes) {
        try { if (ws && ws.readyState === 1) ws.send(JSON.stringify({ cmd: "SHOP_PUT_ITEM_RES", data: putRes, req_id: req_id })); } catch (eP) { }
      });
      return { __async: true };
    } else if (cmd === "SHOP_GET_STOCK") {
      var stock = ShopEngine.getItemStock(msg.itemKey);
      return { cmd: "SHOP_GET_STOCK_RES", stock: stock, itemKey: msg.itemKey, req_id: req_id };
    } else if (cmd === "CHECK_FRIEND_GARDEN") {
      var fRes = ShopEngine.checkFriendGarden();
      return { cmd: "CHECK_FRIEND_GARDEN_RES", inFriendGarden: fRes.inFriendGarden, friendId: fRes.friendId, friendName: fRes.friendName, req_id: req_id };
    } else if (cmd === "OPEN_FRIEND_SHOP") {
      var ofRes = ShopEngine.openFriendShop(msg.friendId);
      return { cmd: "OPEN_FRIEND_SHOP_RES", success: ofRes.success, data: ofRes, req_id: req_id };
    } else if (cmd === "GET_FRIEND_SHOP_SLOTS") {
      var gfsRes = ShopEngine.getFriendShopSlots();
      return { cmd: "GET_FRIEND_SHOP_SLOTS_RES", data: gfsRes, req_id: req_id };
    } else if (cmd === "BUY_FRIEND_SLOT") {
      var bfsRes = ShopEngine.buyFriendSlot(msg.slot);
      return { cmd: "BUY_FRIEND_SLOT_RES", data: bfsRes, req_id: req_id };
    } else if (cmd === "REFRESH_FRIEND_SHOP") {
      var rfRes = ShopEngine.refreshFriendShop(msg.friendId);
      return { cmd: "REFRESH_FRIEND_SHOP_RES", success: rfRes.success, data: rfRes, req_id: req_id };
    } else if (cmd === "CLOSE_FRIEND_SHOP") {
      var cfsRes = ShopEngine.closeFriendShop();
      return { cmd: "CLOSE_FRIEND_SHOP_RES", success: cfsRes.success, req_id: req_id };
    } else if (cmd === "GET_STORAGE_STATUS") {
      var gssRes = ShopEngine.getStorageStatus(msg.itemKeys);
      return { cmd: "GET_STORAGE_STATUS_RES", data: gssRes, req_id: req_id };
    } else if (cmd === "GO_HOME") {
      var ghRes = ShopEngine.goHome();
      return { cmd: "GO_HOME_RES", success: ghRes.success, data: ghRes, req_id: req_id };
    } else if (cmd === "BUG_SCAN") {
      return { cmd: "BUG_SCAN_RES", data: BugEngine.scan(), req_id: req_id };
    } else if (cmd === "BUG_CATCH_CELL") {
      return { cmd: "BUG_CATCH_CELL_RES", data: BugEngine.catchCell(msg.floor, msg.slot), req_id: req_id };
    } else if (cmd === "CHEST_OP") {
      return { cmd: "CHEST_OP_RES", data: ChestEngine.run(msg.op), req_id: req_id };
    } else if (cmd === "ORDER_OP") {
      return { cmd: "ORDER_OP_RES", data: OrderEngine.run(msg.op, msg.id), req_id: req_id };
    } else if (cmd === "FARM_OP") {
      if (msg.op === "ABORT") { FarmEngine._abort = true; return { cmd: "FARM_OP_RES", data: { success: true }, req_id: req_id }; }
      if (msg.op === "PLANT_RUN" || msg.op === "HARVEST_RUN") {
        FarmEngine.runAsync(msg, function (data) {
          try { if (ws && ws.readyState === 1) ws.send(JSON.stringify({ cmd: "FARM_OP_RES", data: data, req_id: req_id })); } catch (eR) { }
        });
        return { __async: true };
      }
      return { cmd: "FARM_OP_RES", data: FarmEngine.run(msg), req_id: req_id };
    } else if (cmd === "POPUP_OP") {
      return { cmd: "POPUP_OP_RES", data: PopupEngine.run(msg.op, msg.key, msg.z, msg.btn), req_id: req_id };
    } else if (cmd === "MACHINE_OP") {
      return { cmd: "MACHINE_OP_RES", data: MachineEngine.run(msg), req_id: req_id };
    } else if (cmd === "EVAL") {
      var res = "";
      try {
        res = String(eval(msg.code));
      } catch (err) {
        res = "ERR: " + String(err);
      }
      return { cmd: "EVAL_RES", result: res, req_id: req_id, id: msg.id || 0 };
    }
    return { success: false, reason: "unknown_cmd", cmd: cmd, req_id: req_id };
  }

  // ==========================================================================
  // ADB FILE IPC - GIAO TIEP TRUC TIEP QUA FILE TAM TREN SDCARD
  // ==========================================================================
  var fileIpcTimer = null;
  var CMD_CANDIDATE_PATHS = [
    "/sdcard/Android/data/vn.kvtm.js/files/kvtm_cmd.json",
    "/sdcard/kvtm_cmd.json"
  ];
  var RES_FILE_PRIMARY = "/sdcard/Android/data/vn.kvtm.js/files/kvtm_res.json";
  var RES_FILE_SECONDARY = "/sdcard/kvtm_res.json";

  function initFileIpc() {
    if (fileIpcTimer) {
      clearInterval(fileIpcTimer);
      fileIpcTimer = null;
    }
    if (typeof jsb === "undefined" || !jsb.fileUtils) return;

    if (typeof cc !== "undefined" && cc.log) {
      cc.log("[KVTMAgent] ADB File IPC engine started successfully!");
    }

    fileIpcTimer = setInterval(function () {
      try {
        if (!jsb.fileUtils) return;
        for (var i = 0; i < CMD_CANDIDATE_PATHS.length; i++) {
          var cmdPath = CMD_CANDIDATE_PATHS[i];
          if (jsb.fileUtils.isFileExist(cmdPath)) {
            var raw = jsb.fileUtils.getStringFromFile(cmdPath);
            try { jsb.fileUtils.removeFile(cmdPath); } catch (eRem) { }
            if (!raw || raw.trim().length === 0) continue;

            var msg = null;
            try {
              msg = JSON.parse(raw);
            } catch (errJson) {
              continue;
            }

            var res = dispatchCommand(msg);
            var resStr = JSON.stringify(res);
            try { jsb.fileUtils.writeStringToFile(resStr, RES_FILE_PRIMARY); } catch (eW1) { }
            try { jsb.fileUtils.writeStringToFile(resStr, RES_FILE_SECONDARY); } catch (eW2) { }

            if (typeof cc !== "undefined" && cc.log) {
              cc.log("[KVTMAgent_IPC] Executed cmd: " + (msg.cmd || "unknown") + " -> " + (res.success !== undefined ? res.success : true));
            }
            break;
          }
        }
      } catch (e) {
        if (typeof cc !== "undefined" && cc.log) {
          cc.log("[KVTMAgent] File IPC loop err: " + e);
        }
      }
    }, 35);
  }

  function jumpToFloor(arg) {
    try {
      var floorNum = 1;
      var delta = null;
      if (typeof arg === "number") {
        floorNum = arg;
      } else if (arg && typeof arg === "object") {
        if (arg.delta !== undefined && arg.delta !== null) {
          delta = Number(arg.delta);
        } else if (arg.floor !== undefined && arg.floor !== null) {
          floorNum = Number(arg.floor);
        }
      }

      var executed = false;

      if (typeof gv !== "undefined" && gv.background) {
        var bg = gv.background;
        var curFloor = (bg.floorIndex < 0) ? 0 : (bg.floorIndex + 1);
        if (delta !== null && !isNaN(delta)) {
          floorNum = curFloor + delta;
        }
        var maxFloor = (typeof CloudFloors !== "undefined" && typeof CloudFloors.getLastUnlockedFloorIdx === "function")
          ? (CloudFloors.getLastUnlockedFloorIdx() + 1)
          : 10;
        if (floorNum < 0) floorNum = 0;
        if (floorNum > maxFloor) floorNum = maxFloor;

        var targetIdx = floorNum - 1; // Tầng 1 là index 0, mặt đất là -1

        if (typeof Game !== "undefined" &&
            typeof Game.onBlockedTouchBegan === "function" &&
            typeof Game.onBlockedTouchMoved === "function" &&
            typeof Game.onBlockedTouchEnded === "function" &&
            typeof bg.getFloorSnapY === "function") {
          if (bg.touchId !== undefined && bg.touchId !== -1) {
            bg.touchId = -1;
          }
          var curY = bg.base.y;
          var moveVecY = 0;
          if (targetIdx === bg.floorIndex) {
            // Đang ở đúng tầng đích -> vuốt nhẹ 15px (10 < 15 <= 40 = BG.FLOOR_CHANGE_MIN_OFFSET_Y)
            // Kích hoạt isScrolling nhưng giữ nguyên tầng hiện tại và để game tự cập nhật lastActionTime
            moveVecY = 15;
          } else if (targetIdx < 0) {
            // Từ tầng mây vuốt về mặt đất (groundMinY >= 0 && moveVector.y > 40)
            var gHeight = (typeof BG !== "undefined" && BG.GROUND_HEIGHT !== undefined) ? BG.GROUND_HEIGHT : 78;
            var gOffset = (typeof BG !== "undefined" && BG.GROUND_OFFSET !== undefined) ? BG.GROUND_OFFSET : 25;
            var groundY = (bg.ground && bg.ground.y !== undefined) ? bg.ground.y : 0;
            var minGroundBaseY = gHeight - groundY + 50;
            var targetBaseY = Math.max(curY + 100, minGroundBaseY, gOffset + 100);
            moveVecY = targetBaseY - curY;
          } else {
            // Vuốt lên hoặc xuống tầng mây targetIdx (0..9)
            var baseIdx = (typeof BG !== "undefined" && BG.FLOOR_BASE_INDEX !== undefined) ? BG.FLOOR_BASE_INDEX : 0;
            var floorBasePosY = bg.getFloorSnapY(baseIdx);
            var targetBaseY = floorBasePosY - bg.floorStartY - bg.getFloorSnapY(targetIdx);
            moveVecY = targetBaseY - curY;
            if (targetIdx > bg.floorIndex && moveVecY > -50) moveVecY = -60;
            else if (targetIdx < bg.floorIndex && moveVecY < 50) moveVecY = 60;
          }

          var x = 500;
          var y0 = 500;
          var y1 = y0 + moveVecY;
          Game.onBlockedTouchBegan(x, y0);
          Game.onBlockedTouchMoved(x, y1);
          Game.onBlockedTouchEnded(x, y1);
          executed = (bg.floorIndex === targetIdx);
        }
      }

      // Đợi camera dừng (280ms) rồi gửi FLOOR_READY về Python
      setTimeout(function () {
        if (ws && ws.readyState === 1) {
          ws.send(JSON.stringify({
            cmd: "FLOOR_READY",
            floor: floorNum,
            success: executed
          }));
        }
      }, 280);

      return executed;
    } catch (e) {
      return false;
    }
  }

  // ==========================================================================
  // SHOP ENGINE - QUẢN LÝ QUẦY HÀNG TỰ ĐỘNG CHUẨN XÁC THEO COCOS2D-JS ENGINE
  // ==========================================================================
  var ITEM_KEY_TO_ID = {};
  var ITEM_ID_TO_KEY = {};

  function initItemCache() {
    try {
      if (typeof ITEM_MAPPING === "undefined") return;
      for (var key in ITEM_MAPPING) {
        var info = ITEM_MAPPING[key];
        if (!info) continue;
        if (info.id) {
          ITEM_KEY_TO_ID[key] = info.id;
          ITEM_ID_TO_KEY[info.id] = key;
          continue;
        }
        if (!info.ma_anh) continue;
        var ma_anh = info.ma_anh;
        var no_ext = ma_anh.replace(/\.png$/i, "");
        var foundId = null;

        var sources = [];
        if (typeof g_PRODUCT !== "undefined") sources.push(g_PRODUCT);
        if (typeof g_PLANT !== "undefined") sources.push(g_PLANT);
        if (typeof g_MATERIAL !== "undefined") sources.push(g_MATERIAL);
        if (typeof g_EVENT_ITEMS !== "undefined") sources.push(g_EVENT_ITEMS);
        if (typeof g_STOCK !== "undefined") sources.push(g_STOCK);

        for (var s = 0; s < sources.length; s++) {
          var src = sources[s];
          if (!src) continue;
          for (var k in src) {
            var p = src[k];
            if (!p) continue;
            if (p.GFX === ma_anh || p.GFX === no_ext ||
              (p.ICON_PATH && (p.ICON_PATH.indexOf(no_ext) !== -1 || p.ICON_PATH.indexOf(ma_anh) !== -1)) ||
              k === ma_anh || k === no_ext || k === key ||
              (p.NAME && info.ten_game && p.NAME.toLowerCase() === info.ten_game.toLowerCase())) {
              foundId = p.ID || k;
              break;
            }
          }
          if (foundId) break;
        }

        if (foundId) {
          ITEM_KEY_TO_ID[key] = foundId;
          ITEM_ID_TO_KEY[foundId] = key;
        }
      }
    } catch (e) { }
  }

  function resolveItemId(itemKey) {
    if (!itemKey) return "";
    var cleanKey = String(itemKey).replace(/\.png$/i, "").trim();

    // Alias redirect cho các lỗi chính tả hoặc tên gọi tương đương
    if (cleanKey === "kho_oai_huong" || cleanKey === "oai_huong") cleanKey = "kho_cay_oai";
    if (cleanKey === "kho_da_cam" || cleanKey === "da_cam") cleanKey = "kho_ngoc_cam";
    if (cleanKey === "cam_ga" || cleanKey === "vpsk_ga") cleanKey = "vpsk-ga";
    if (cleanKey === "cam_bo" || cleanKey === "vpsk_bo") cleanKey = "vpsk-bo";
    if (cleanKey === "cam_cuu" || cleanKey === "vpsk_cuu") cleanKey = "vpsk-cuu";
    if (cleanKey === "cam_heo" || cleanKey === "vpsk_heo") cleanKey = "vpsk-heo";
    if (cleanKey === "dua_sk") cleanKey = "vpsk_dua";
    if (cleanKey === "kem_sk") cleanKey = "vpsk_kem";
    if (cleanKey.indexOf("vpsk-") !== 0 && cleanKey.indexOf("-") !== -1) {
      cleanKey = cleanKey.replace(/-/g, "_");
    }

    if (ITEM_KEY_TO_ID[cleanKey]) return ITEM_KEY_TO_ID[cleanKey];

    // Fallback thử có "kho_", "kho_cay_" hoặc bỏ "kho_"
    if (cleanKey.indexOf("kho_") !== 0 && ITEM_KEY_TO_ID["kho_" + cleanKey]) {
      return ITEM_KEY_TO_ID["kho_" + cleanKey];
    }
    if (cleanKey.indexOf("kho_cay_") !== 0 && ITEM_KEY_TO_ID["kho_cay_" + cleanKey]) {
      return ITEM_KEY_TO_ID["kho_cay_" + cleanKey];
    }
    if (cleanKey.indexOf("kho_") === 0 && ITEM_KEY_TO_ID[cleanKey.substring(4)]) {
      return ITEM_KEY_TO_ID[cleanKey.substring(4)];
    }

    initItemCache();

    if (ITEM_KEY_TO_ID[cleanKey]) return ITEM_KEY_TO_ID[cleanKey];
    if (cleanKey.indexOf("kho_") !== 0 && ITEM_KEY_TO_ID["kho_" + cleanKey]) {
      return ITEM_KEY_TO_ID["kho_" + cleanKey];
    }
    if (cleanKey.indexOf("kho_cay_") !== 0 && ITEM_KEY_TO_ID["kho_cay_" + cleanKey]) {
      return ITEM_KEY_TO_ID["kho_cay_" + cleanKey];
    }
    if (cleanKey.indexOf("kho_") === 0 && ITEM_KEY_TO_ID[cleanKey.substring(4)]) {
      return ITEM_KEY_TO_ID[cleanKey.substring(4)];
    }

    return cleanKey;
  }

  function resolveItemKey(itemId) {
    if (!itemId) return "";
    var cleanId = String(itemId).trim();
    if (ITEM_ID_TO_KEY[cleanId]) return ITEM_ID_TO_KEY[cleanId];
    initItemCache();
    return ITEM_ID_TO_KEY[cleanId] || cleanId;
  }

  var ShopEngine = {
    isDailyLimitReached: false,
    _limitHooked: false,

    hookDailyLimit: function () {
      if (this._limitHooked) return;
      try {
        if (typeof PrivateShop !== 'undefined' && typeof PrivateShop.showWarnDailyLimitReach === 'function') {
          var originalWarn = PrivateShop.showWarnDailyLimitReach;
          var self = this;
          PrivateShop.showWarnDailyLimitReach = function () {
            self.isDailyLimitReached = true;
            if (typeof originalWarn === 'function') {
              return originalWarn.apply(this, arguments);
            }
          };
          this._limitHooked = true;
        }
      } catch (e) { }
    },

    // 1. Lấy trạng thái đầy đủ toàn bộ ô của quầy hàng (Tự co giãn 10, 12, 16, 20... ô)
    getStatus: function () {
      try {
        var ps = (typeof gv !== "undefined" && gv.userData) ? gv.userData.privateShop : null;
        if (!ps) return { success: false, reason: "no_private_shop" };

        // 1. Xác định số ô thực tế đã mở khóa bằng PrivateShop.getSlotList() nếu quầy đang mở
        var slotWidgets = (typeof PrivateShop !== "undefined" && typeof PrivateShop.getSlotList === "function")
          ? PrivateShop.getSlotList()
          : null;
        var maxUnlockedSlots = (slotWidgets && slotWidgets.length > 0) ? slotWidgets.length : 0;

        var rawSlots = ps[4] || [];
        var slots = [];
        var totalLen = (maxUnlockedSlots > 0) ? Math.min(rawSlots.length, maxUnlockedSlots) : rawSlots.length;

        for (var i = 0; i < totalLen; i++) {
          var s = rawSlots[i];
          var isWidgetUnlocked = (maxUnlockedSlots > 0) ? (i < maxUnlockedSlots) : true;

          if (!s || Object.keys(s).length === 0) {
            var unlocked = isWidgetUnlocked;
            slots.push({
              index: i,
              isEmpty: unlocked,
              isSold: false,
              isAd: false,
              adTime: 0,
              isUnlocked: unlocked,
              item: "",
              itemKey: "",
              amount: 0,
              price: 0
            });
          } else {
            var isSold = (s["8"] === true || s.isSold === true || s.sold === true);
            var itemId = s["5"] || s.item || "";
            var hasItem = !!itemId;
            var adTime = Number(s["9"]) || 0;
            var isAd = (adTime > 0) || s.isAdvertising === true || s.isAd === true;
            var slotUnlocked = isWidgetUnlocked && !(Number(s.index) < 0) && (s.isUnlocked !== false);

            slots.push({
              index: i,
              isEmpty: slotUnlocked && !hasItem,
              isSold: isSold,
              isAd: isAd,
              adTime: adTime,
              isUnlocked: slotUnlocked,
              item: itemId,
              itemKey: resolveItemKey(itemId),
              amount: s["6"] || s.amount || 0,
              price: s["7"] || s.price || 0
            });
          }
        }

        var lastAdTime = Number(ps[3]) || 0;
        var curGameTime = (typeof Game !== "undefined" && typeof Game.getGameTimeInSeconds === "function")
          ? Game.getGameTimeInSeconds()
          : Math.floor(Date.now() / 1000);
        var adElapsed = curGameTime - lastAdTime;
        var canAd = (adElapsed >= 300);
        var remainingAd = Math.max(0, 300 - adElapsed);
        this.hookDailyLimit();
        var dailyUsed = Number(ps[13]) || 0;
        var dailyLimit = 0;
        if (typeof g_MISCINFO !== 'undefined' && g_MISCINFO.PS_NUM_SELL_DAILY_LIMIT !== undefined) {
          dailyLimit = Number(g_MISCINFO.PS_NUM_SELL_DAILY_LIMIT) || 0;
        }

        if (dailyLimit > 0) {
          if (dailyUsed >= dailyLimit) {
            this.isDailyLimitReached = true;
          } else {
            this.isDailyLimitReached = false;
          }
        }

        var isDailyLimitReached = !!this.isDailyLimitReached || (dailyLimit > 0 && dailyUsed >= dailyLimit);
        var diamond = 0;
        if (typeof gv !== "undefined" && gv.userData) {
          if (typeof gv.userData.getCoin === "function") diamond = Number(gv.userData.getCoin()) || 0;
          else if (gv.userData.coin !== undefined) diamond = Number(gv.userData.coin) || 0;
          else if (gv.userData.clientCoin !== undefined) diamond = Number(gv.userData.clientCoin) || 0;
        }

        return {
          success: true,
          diamond: diamond,
          totalSlots: slots.length,
          slots: slots,
          dailyUsed: dailyUsed,
          dailyLimit: dailyLimit,
          remainingDailyQuota: (dailyLimit > 0) ? Math.max(0, dailyLimit - dailyUsed) : 999999,
          isDailyLimitReached: isDailyLimitReached,
          lastAdTime: lastAdTime,
          canAd: canAd,
          remainingAd: remainingAd
        };
      } catch (e) {
        return { success: false, error: String(e) };
      }
    },

    // Cuộn khung danh sách quầy (itemList) tới cột của ô slotIndex và trả về widget của ô đó
    _scrollToSlot: function (slotIndex, immediate) {
      this._lastScrolled = false;
      try {
        if (typeof FWPool === "undefined" || typeof csp === "undefined" || !csp.uiPrivateShop) return null;
        var widget = FWPool.getNode(csp.uiPrivateShop, false);
        if (!widget) return null;
        var scrollView = (typeof FWUtils !== "undefined" && FWUtils.getChildByName) ? FWUtils.getChildByName(widget, "itemList") : null;
        if (!scrollView) return widget;
        var children = scrollView.getChildren ? scrollView.getChildren() : [];
        var totalItems = children.length;
        if (totalItems <= 0 && typeof PrivateShop !== "undefined" && PrivateShop.privateShop && PrivateShop.privateShop[4]) {
          totalItems = PrivateShop.privateShop[4].length + 2;
        }
        var totalCols = Math.ceil(totalItems / 2);
        var col = Math.floor(Number(slotIndex) / 2);
        var pct = 0;
        if (totalCols > 4 && col >= 3) {
          pct = Math.min(100, Math.round(((col - 2) / Math.max(1, totalCols - 4)) * 100));
        }
        var inner = scrollView.getInnerContainer ? scrollView.getInnerContainer() : null;
        if (inner && scrollView.getContentSize && inner.getContentSize) {
          var svW = scrollView.getContentSize().width;
          var inW = inner.getContentSize().width;
          if (inW > svW) {
            var targetX = -((inW - svW) * (pct / 100.0));
            var curPos = inner.getPosition();
            if (Math.abs(curPos.x - targetX) > 5) {
              if (!immediate && typeof scrollView.scrollToPercentHorizontal === "function") {
                scrollView.scrollToPercentHorizontal(pct, 0.12, true);
              } else {
                inner.setPosition(cc.p(targetX, curPos.y));
              }
              this._lastScrolled = true;
            }
          }
        }
        for (var i = 0; i < children.length; i++) {
          var ch = children[i];
          if (ch && ch.uiData && ch.uiData.index === slotIndex) {
            return ch;
          }
        }
        return widget;
      } catch (e) {
        return null;
      }
    },

    // Chuẩn bị ngữ cảnh ô trên PrivateShop trước khi gọi hàm UI gốc của game
    _prepareSlot: function (slotIndex) {
      var ps = (typeof gv !== "undefined" && gv.userData) ? gv.userData.privateShop : null;
      if (!ps || !ps[4]) return null;
      PrivateShop.friendId = null;
      PrivateShop.friendData = null;
      PrivateShop.showFromNewsBoard = false;
      PrivateShop.showFromEvent = false;
      PrivateShop.showFromEventBoard = false;
      PrivateShop.showFromEventShop = false;
      PrivateShop.privateShop = ps;
      if (!ps[4][slotIndex]) ps[4][slotIndex] = {};
      var slotData = ps[4][slotIndex];
      slotData.index = slotIndex;
      if (typeof PrivateShop.updateSlotDisplay === "function") {
        PrivateShop.updateSlotDisplay(slotData);
      }
      var slotWidget = this._scrollToSlot(slotIndex, false);
      var scrolled = !!this._lastScrolled;
      if (!slotWidget && typeof FWUtils !== "undefined" && typeof FWUtils.getCurrentScene === "function") {
        slotWidget = FWUtils.getCurrentScene();
      }
      if (slotWidget && !slotWidget.uiData) {
        slotWidget.uiData = slotData;
      }
      PrivateShop.currentSlotWidget = slotWidget;
      PrivateShop.currentSlotUiData = slotData;
      return { ps: ps, slotData: slotData, slotWidget: slotWidget, scrolled: scrolled };
    },

    // 2. Thu tiền 1 ô (cuộn nếu cần -> nghỉ 0.15s -> gọi PrivateShop.getMoney)
    collectMoney: function (slotIndex, reply) {
      var done = function (res) { if (typeof reply === "function") reply(res); return res; };
      if (typeof gv === "undefined" || !PrivateShop || typeof PrivateShop.getMoney !== "function") {
        return done({ success: false, reason: "not_ready" });
      }
      try {
        var ps = gv.userData ? gv.userData.privateShop : null;
        if (!ps || !ps[4] || !ps[4][slotIndex]) {
          return done({ success: false, reason: "invalid_slot", slot: slotIndex });
        }
        var s = ps[4][slotIndex];
        var isSold = (s["8"] === true || s.isSold === true || s.sold === true);
        if (!isSold) {
          return done({ success: false, reason: "not_sold", slot: slotIndex });
        }
        var ctx = this._prepareSlot(slotIndex);
        if (!ctx) return done({ success: false, reason: "prepare_failed", slot: slotIndex });
        var self = this;
        var doCollect = function () {
          try {
            self._scrollToSlot(slotIndex, true);
            PrivateShop.currentSlotWidget = ctx.slotWidget;
            PrivateShop.currentSlotUiData = ctx.slotData;
            PrivateShop.getMoney(ctx.slotWidget);
            self._scrollToSlot(slotIndex, true);
            var afterSlot = ps[4][slotIndex] || {};
            var ok = !(afterSlot["5"] || afterSlot.item);
            return done({ success: ok, slot: slotIndex });
          } catch (eC) {
            return done({ success: false, error: String(eC) });
          }
        };
        if (ctx.scrolled && typeof reply === "function") {
          setTimeout(doCollect, 150);
          return { __async: true };
        }
        return doCollect();
      } catch (e) {
        return done({ success: false, error: String(e) });
      }
    },

    // 3. Đặt quảng cáo cho 1 ô trên quầy (cuộn nếu cần -> nghỉ 0.15s -> mở popup showSlotInfo -> nghỉ 0.15s -> gọi PrivateShop.onSetAds)
    adSlot: function (slotIndex, reply) {
      var done = function (res) { if (typeof reply === "function") reply(res); return res; };
      if (typeof gv === "undefined" || !PrivateShop || typeof PrivateShop.onSetAds !== "function") {
        return done({ success: false, reason: "not_ready" });
      }
      try {
        var ps = gv.userData ? gv.userData.privateShop : null;
        if (!ps || !ps[4] || !ps[4][slotIndex]) {
          return done({ success: false, reason: "invalid_slot", slot: slotIndex });
        }
        var s = ps[4][slotIndex];
        var hasItem = !!(s["5"] || s.item);
        var isSold = (s["8"] === true || s.isSold === true || s.sold === true);
        if (!hasItem || isSold) {
          return done({ success: false, reason: "invalid_slot_state", slot: slotIndex });
        }
        var ctx = this._prepareSlot(slotIndex);
        if (!ctx) return done({ success: false, reason: "prepare_failed", slot: slotIndex });
        var self = this;
        var openAndAd = function () {
          try {
            self._scrollToSlot(slotIndex, true);
            if (typeof PrivateShop.showSlotInfo === "function") {
              PrivateShop.showSlotInfo(ctx.slotWidget);
            }
            if (typeof reply === "function") {
              setTimeout(function () {
                try {
                  PrivateShop.currentSlotWidget = ctx.slotWidget;
                  PrivateShop.currentSlotUiData = ctx.slotData;
                  PrivateShop.onSetAds(null);
                  self._scrollToSlot(slotIndex, true);
                  var ok = !!(ctx.slotData["9"] && Number(ctx.slotData["9"]) > 0);
                  reply({ success: ok, slot: slotIndex });
                } catch (e2) {
                  reply({ success: false, error: String(e2) });
                }
              }, 150);
              return;
            }
            PrivateShop.onSetAds(null);
            self._scrollToSlot(slotIndex, true);
          } catch (eOpen) {
            done({ success: false, error: String(eOpen) });
          }
        };
        if (typeof reply === "function") {
          if (ctx.scrolled) {
            setTimeout(openAndAd, 150);
          } else {
            openAndAd();
          }
          return { __async: true };
        }
        openAndAd();
        return { success: !!(ctx.slotData["9"] && Number(ctx.slotData["9"]) > 0), slot: slotIndex };
      } catch (e) {
        return done({ success: false, error: String(e) });
      }
    },

    // 4. Hủy bán bằng kim cương (cuộn nếu cần -> nghỉ 0.15s -> mở popup showSlotInfo -> nghỉ 0.15s -> gọi PrivateShop.onCancelSellingConfirmed)
    cancelSlot: function (slotIndex, diamondCost, reply) {
      var done = function (res) { if (typeof reply === "function") reply(res); return res; };
      if (typeof gv === "undefined" || !PrivateShop || typeof PrivateShop.onCancelSellingConfirmed !== "function") {
        return done({ success: false, reason: "not_ready" });
      }
      try {
        var ps = gv.userData ? gv.userData.privateShop : null;
        if (!ps || !ps[4] || !ps[4][slotIndex]) {
          return done({ success: false, reason: "invalid_slot", slot: slotIndex });
        }
        var s = ps[4][slotIndex];
        var hasItem = !!(s["5"] || s.item);
        var isSold = (s["8"] === true || s.isSold === true || s.sold === true);
        if (!hasItem || isSold) {
          return done({ success: false, reason: "invalid_slot_state", slot: slotIndex });
        }
        var cost = (typeof g_MISCINFO !== "undefined" && Number(g_MISCINFO.PS_PRICE_CANCEL) > 0)
          ? Number(g_MISCINFO.PS_PRICE_CANCEL)
          : (diamondCost || 1);
        var ud = gv.userData;
        if (ud && typeof ud.getCoin === "function" && ud.getCoin() < cost) {
          return done({ success: false, reason: "no_diamond", diamond: ud.getCoin() });
        }
        var ctx = this._prepareSlot(slotIndex);
        if (!ctx) return done({ success: false, reason: "prepare_failed", slot: slotIndex });
        var self = this;
        var openAndCancel = function () {
          try {
            self._scrollToSlot(slotIndex, true);
            if (typeof PrivateShop.showSlotInfo === "function") {
              PrivateShop.showSlotInfo(ctx.slotWidget);
            }
            if (typeof reply === "function") {
              setTimeout(function () {
                try {
                  PrivateShop.currentSlotWidget = ctx.slotWidget;
                  PrivateShop.currentSlotUiData = ctx.slotData;
                  PrivateShop.onCancelSellingConfirmed(null);
                  self._scrollToSlot(slotIndex, true);
                  var afterSlot = (ps[4] && ps[4][slotIndex]) ? ps[4][slotIndex] : {};
                  var ok = !(afterSlot["5"] || afterSlot.item);
                  reply({ success: ok, slot: slotIndex, diamond: (ud && ud.getCoin) ? ud.getCoin() : null });
                } catch (e2) {
                  reply({ success: false, error: String(e2) });
                }
              }, 150);
              return;
            }
            PrivateShop.onCancelSellingConfirmed(null);
            self._scrollToSlot(slotIndex, true);
          } catch (eOpen2) {
            done({ success: false, error: String(eOpen2) });
          }
        };
        if (typeof reply === "function") {
          if (ctx.scrolled) {
            setTimeout(openAndCancel, 150);
          } else {
            openAndCancel();
          }
          return { __async: true };
        }
        openAndCancel();
        var afterSlotSync = (ps[4] && ps[4][slotIndex]) ? ps[4][slotIndex] : {};
        return { success: !(afterSlotSync["5"] || afterSlotSync.item), slot: slotIndex };
      } catch (e) {
        return done({ success: false, error: String(e) });
      }
    },

    // 5. Tra cứu giá bán vật phẩm từ RAM game
    getItemPriceInfo: function (itemId) {
      var itemDef = null;
      var cleanId = String(itemId).trim();
      var altKey = cleanId;
      if (cleanId.charAt(0) === "I") altKey = "T" + cleanId.substring(1);
      else if (cleanId.charAt(0) === "T") altKey = "I" + cleanId.substring(1);

      var tables = [
        typeof g_PLANT !== "undefined" ? g_PLANT : null,
        typeof g_PRODUCT !== "undefined" ? g_PRODUCT : null,
        typeof g_MATERIAL !== "undefined" ? g_MATERIAL : null,
        typeof g_EVENT_ITEMS !== "undefined" ? g_EVENT_ITEMS : null,
        typeof g_PEST !== "undefined" ? g_PEST : null,
        typeof defineMap !== "undefined" ? defineMap : null
      ];

      for (var t = 0; t < tables.length; t++) {
        var tbl = tables[t];
        if (!tbl) continue;
        if (tbl[cleanId]) {
          itemDef = tbl[cleanId];
          break;
        }
        if (altKey && tbl[altKey]) {
          itemDef = tbl[altKey];
          break;
        }
        for (var k in tbl) {
          if (tbl[k] && (tbl[k].ID == cleanId || String(tbl[k].ID) === cleanId || tbl[k].ID == altKey || String(tbl[k].ID) === altKey)) {
            itemDef = tbl[k];
            break;
          }
        }
        if (itemDef) break;
      }

      if (!itemDef) {
        if (/^E\d+FD\d+$/i.test(cleanId)) {
          return { min: 100, max: 1000, def: 1000 };
        }
        return { min: 1, max: 100, def: 50 };
      }
      var minP = Number(itemDef.GOLD_MIN) || Number(itemDef.PRICE_MIN) || 1;
      var maxP = Number(itemDef.GOLD_MAX) || Number(itemDef.PRICE_MAX) || 100;
      var defP = Number(itemDef.GOLD_DEFAULT) || Number(itemDef.GOLD_MAX) || maxP || 50;
      return {
        min: minP,
        max: maxP,
        def: defP
      };
    },

    // 6. Kiểm tra số lượng tồn kho
    getItemStock: function (itemKey) {
      try {
        var itemId = resolveItemId(itemKey);
        if (typeof gv !== "undefined" && gv.userStorages) {
          if (typeof gv.userStorages.getItemAmount === "function") {
            var amt = Number(gv.userStorages.getItemAmount(itemId)) || 0;
            if (amt > 0) return amt;
          }
          if (typeof WarehouseReader !== "undefined" && typeof WarehouseReader.getItemAmount === "function") {
            var wAmt = Number(WarehouseReader.getItemAmount(itemId)) || 0;
            if (wAmt > 0) return wAmt;
          }
          if (gv.userStorages.storages) {
            var targetUpper = String(itemId).toUpperCase();
            var keyUpper = String(itemKey).toUpperCase();
            for (var i = 0; i < gv.userStorages.storages.length; i++) {
              var st = gv.userStorages.storages[i];
              if (!st) continue;
              var stk = st.items || st.stock || {};
              for (var k in stk) {
                var itm = stk[k];
                var curId = String((itm && itm.itemId) || k).toUpperCase();
                if (curId === targetUpper || curId === keyUpper) {
                  return Number((itm && itm.itemAmount) || (itm && itm.count) || 0);
                }
              }
            }
          }
        }
        return 0;
      } catch (e) {
        return 0;
      }
    },

    // 7. Đặt bán vật phẩm vào ô trống (cuộn nếu cần -> nghỉ 0.15s -> gọi PrivateShop.onSell)
    putItem: function (slotIndex, itemKey, qty, priceMode, exactPrice, isAd, minKeepStock, reply) {
      var done = function (res) { if (typeof reply === "function") reply(res); return res; };
      if (typeof gv === "undefined" || !gv.gameClient || !PrivateShop || !PrivateShop.RequestPrivateShopPut) {
        return done({ success: false, reason: "not_ready" });
      }
      try {
        // 0. Kiểm tra lượt bán trong ngày TRƯỚC KHI ĐẶT
        this.hookDailyLimit();
        var ps = (typeof gv !== "undefined" && gv.userData) ? gv.userData.privateShop : null;

        // Kiểm tra an toàn: Nếu ô đã có hàng hoặc chưa mở khóa -> chặn đặt lại
        if (ps && ps[4] && ps[4][slotIndex]) {
          var curSlot = ps[4][slotIndex];
          var existItem = curSlot["5"] || curSlot.item || "";
          if (existItem) {
            return done({ success: false, reason: "slot_already_occupied", slot: slotIndex });
          }
          if (curSlot["8"] === true || curSlot.isSold === true) {
            return done({ success: false, reason: "slot_has_gold", slot: slotIndex });
          }
        }
        var dailyUsed = ps ? (Number(ps[13]) || 0) : 0;
        var dailyLimit = (typeof g_MISCINFO !== "undefined" && g_MISCINFO.PS_NUM_SELL_DAILY_LIMIT !== undefined)
          ? (Number(g_MISCINFO.PS_NUM_SELL_DAILY_LIMIT) || 0)
          : 0;

        if (this.isDailyLimitReached || (dailyLimit > 0 && dailyUsed >= dailyLimit)) {
          this.isDailyLimitReached = true;
          return done({
            success: false,
            reason: "daily_limit_reached",
            dailyUsed: dailyUsed,
            dailyLimit: dailyLimit
          });
        }
        var itemId = resolveItemId(itemKey);
        var quantity = qty || 10;
        var keepLimit = (minKeepStock !== undefined) ? minKeepStock : 10;

        // Kiểm tra tồn kho RAM: Giữ lại tối thiểu 10 cái (kho >= 20 mới bán, 19 không bán)
        var stock = this.getItemStock(itemKey);
        if (stock - quantity < keepLimit) {
          return done({
            success: false,
            reason: "stock_low",
            stock: stock,
            keepLimit: keepLimit,
            itemId: itemId,
            itemKey: itemKey
          });
        }

        // Tính giá
        var price = 0;
        if (exactPrice && Number(exactPrice) > 0) {
          price = Number(exactPrice);
        } else {
          var pInfo = this.getItemPriceInfo(itemId);
          if (priceMode === "min") price = pInfo.min * quantity;
          else if (priceMode === "max") price = pInfo.max * quantity;
          else price = pInfo.def * quantity;
        }

        var ctx = this._prepareSlot(slotIndex);
        if (!ctx) {
          return done({ success: false, reason: "prepare_failed", slot: slotIndex });
        }
        var self = this;
        var doPut = function () {
          try {
            self._scrollToSlot(slotIndex, true);
            PrivateShop.currentSlotWidget = ctx.slotWidget;
            PrivateShop.currentSlotUiData = ctx.slotData;
            var lastAdTime = ps ? (Number(ps[3]) || 0) : 0;
            var curGameTime = (typeof Game !== "undefined" && typeof Game.getGameTimeInSeconds === "function")
              ? Game.getGameTimeInSeconds()
              : Math.floor(Date.now() / 1000);
            var canAdNow = (curGameTime - lastAdTime) >= 300;
            var useAd = !!isAd && canAdNow;

            var itemDef = (typeof defineMap !== "undefined" && defineMap[itemId]) ? defineMap[itemId] : { ID: itemId, SELL_FEE: 0 };
            var prevAdsIcon = PrivateShop.adsCheckIcon;
            PrivateShop.sellItem = itemDef;
            PrivateShop.sellAmount = quantity;
            PrivateShop.sellTotalPrice = price;
            PrivateShop.adsCheckIcon = { isVisible: function () { return useAd; } };
            try {
              PrivateShop.onSell(null, typeof PS_SELL_TO_GUEST !== "undefined" ? PS_SELL_TO_GUEST : 1);
            } finally {
              PrivateShop.adsCheckIcon = prevAdsIcon;
            }
            self._scrollToSlot(slotIndex, true);

            var afterSlot = (ps && ps[4] && ps[4][slotIndex]) ? ps[4][slotIndex] : {};
            var putOk = ((afterSlot["5"] || afterSlot.item) === itemId);

            return done({
              success: putOk,
              slot: slotIndex,
              itemId: itemId,
              itemKey: itemKey,
              qty: quantity,
              price: price,
              isAd: useAd,
              remainingStock: stock - quantity
            });
          } catch (eP) {
            return done({ success: false, error: String(eP) });
          }
        };
        if (ctx.scrolled && typeof reply === "function") {
          setTimeout(doPut, 150);
          return { __async: true };
        }
        return doPut();
      } catch (e) {
        return done({ success: false, error: String(e) });
      }
    },

    // 8. Kiểm tra xem có đang ở bên nhà bạn bè không
    checkFriendGarden: function () {
      try {
        var isFriend = (typeof Game !== "undefined" && typeof Game.isFriendGarden === "function")
          ? Game.isFriendGarden()
          : false;
        var friendId = null;
        var friendName = "";
        if (isFriend) {
          if (typeof PrivateShop !== "undefined" && PrivateShop.friendId !== undefined && PrivateShop.friendId !== null) {
            friendId = PrivateShop.friendId;
          } else if (typeof PrivateShop !== "undefined" && PrivateShop.friendData) {
            friendId = PrivateShop.friendData[1] || PrivateShop.friendData.userId || PrivateShop.friendData.friendId;
          }
          if (typeof PrivateShop !== "undefined" && PrivateShop.friendData) {
            friendName = PrivateShop.friendData.name || PrivateShop.friendData.userName || "";
          } else if (typeof gv !== "undefined" && gv.friend) {
            friendName = gv.friend.name || gv.friend.userName || "";
          }
        }
        return {
          inFriendGarden: !!isFriend,
          friendId: friendId,
          friendName: friendName
        };
      } catch (e) {
        return { inFriendGarden: false, error: String(e) };
      }
    },

    // 9. Mở quầy hàng bạn bè
    openFriendShop: function (friendId) {
      try {
        var __alreadyOpen = false;
        try {
          if (typeof FWUI !== "undefined" && typeof csp !== "undefined" && csp.uiPrivateShop && typeof FWUI.isShowing === "function") {
            __alreadyOpen = !!FWUI.isShowing(csp.uiPrivateShop, true);
          }
        } catch (eOpen) { }
        if (!__alreadyOpen) {
          // Mo moi: ghi nho du lieu cu de cho server tra don moi, bo cache sold cu
          this._staleRef = this._getFriendShopData();
          this._openAt = Date.now();
          this._lastFriendShopData = null;
        }
        // 1. Kiểm tra nếu quầy hàng đang hiển thị trên màn hình rồi -> Đã mở sẵn
        try {
          if (typeof FWUI !== "undefined" && typeof csp !== "undefined" && csp.uiPrivateShop) {
            if (typeof FWUI.isShowing === "function" && FWUI.isShowing(csp.uiPrivateShop, true)) {
              return { success: true, reason: "already_open" };
            }
          }
        } catch (errCheck) { }

        // 2. Khi đang ở sân vườn bạn bè: Gọi hàm tương tác quầy chuẩn của game engine
        if (typeof gv !== "undefined" && gv.background && typeof gv.background.onWidgetPrivateShopTouched === "function") {
          gv.background.onWidgetPrivateShopTouched();
          return { success: true, method: "onWidgetPrivateShopTouched" };
        }

        // 3. Dự phòng dùng showFriendPrivateShop
        if (typeof PrivateShop !== "undefined" && typeof PrivateShop.showFriendPrivateShop === "function") {
          var fid = friendId || PrivateShop.friendId || (PrivateShop.friendData ? (PrivateShop.friendData[1] || PrivateShop.friendData.userId || PrivateShop.friendData.friendId) : null);
          PrivateShop.showFromNewsBoard = false;
          if (PrivateShop.friendData) {
            PrivateShop.showFriendPrivateShop(PrivateShop.friendData);
          } else if (fid) {
            PrivateShop.showFriendPrivateShop({ 1: Number(fid), userId: Number(fid), friendId: Number(fid) });
          } else {
            PrivateShop.showFriendPrivateShop({});
          }
          return { success: true, method: "showFriendPrivateShop", friendId: fid };
        }
        return { success: false, reason: "no_method" };
      } catch (e) {
        return { success: false, error: String(e) };
      }
    },

    // Helper: Lấy dữ liệu gian hàng bạn bè từ tất cả các nguồn có thể
    _lastFriendShopData: null,
    _lastFriendId: null,

    _getFriendShopData: function () {
      try {
        if (typeof PrivateShop === "undefined") return null;
        // 1. Kiểm tra PrivateShop.friendShop
        if (PrivateShop.friendShop && PrivateShop.friendShop[4] && Array.isArray(PrivateShop.friendShop[4]) && PrivateShop.friendShop[4].length > 0) {
          return PrivateShop.friendShop;
        }
        // 2. Kiểm tra PrivateShop.privateShop
        if (PrivateShop.privateShop && PrivateShop.privateShop[4] && Array.isArray(PrivateShop.privateShop[4]) && PrivateShop.privateShop[4].length > 0) {
          return PrivateShop.privateShop;
        }
        // 3. Kiểm tra PrivateShop.friendData.privateShop
        if (PrivateShop.friendData && PrivateShop.friendData.privateShop && PrivateShop.friendData.privateShop[4] && Array.isArray(PrivateShop.friendData.privateShop[4]) && PrivateShop.friendData.privateShop[4].length > 0) {
          return PrivateShop.friendData.privateShop;
        }
        // 4. Fallback dữ liệu đã lưu lần scan gần nhất
        if (this._lastFriendShopData && this._lastFriendShopData[4] && Array.isArray(this._lastFriendShopData[4]) && this._lastFriendShopData[4].length > 0) {
          return this._lastFriendShopData;
        }
      } catch (e) { }
      return null;
    },

    // Hàm phụ trợ: Xác định kho và khoảng trống của vật phẩm (đối chiếu trực tiếp RAM gv.userStorages)
    _getStorageInfoForItem: function (itemId, itemKey) {
      try {
        var strId = String(itemId || itemKey || "").toLowerCase();
        // Kiểm tra xem có phải vật phẩm sự kiện không (vpsk..., event...)
        var isEvent = (strId.indexOf("vpsk") >= 0 || strId.indexOf("event") >= 0);

        var userStorages = (typeof gv !== "undefined") ? gv.userStorages : null;
        if (!userStorages || !userStorages.storages) {
          return {
            storageId: isEvent ? 5 : 2,
            storageName: isEvent ? "Kho Sự Kiện" : "Kho Thành Phẩm",
            isEvent: isEvent,
            capacityMax: isEvent ? 999999 : 9999,
            capacityCurrent: 0,
            free: isEvent ? 999999 : 9999
          };
        }

        var st = null;
        if (typeof userStorages.getStorageForItemId === "function") {
          try { st = userStorages.getStorageForItemId(itemId); } catch (_) { }
        }

        var stIdx = -1;
        if (st && userStorages.storages) {
          for (var r = 0; r < userStorages.storages.length; r++) {
            if (userStorages.storages[r] === st) {
              stIdx = r;
              break;
            }
          }
        }

        // Nếu chưa tìm thấy, kiểm tra items trong từng kho
        if (stIdx === -1 && userStorages.storages) {
          var targetIdUpper = String(itemId || "").toUpperCase();
          for (var i = 0; i < userStorages.storages.length; i++) {
            var curSt = userStorages.storages[i];
            if (curSt) {
              var its = curSt.items || curSt.stock || {};
              for (var k in its) {
                if (String(k).toUpperCase() === targetIdUpper || (its[k] && String(its[k].itemId || "").toUpperCase() === targetIdUpper)) {
                  st = curSt;
                  stIdx = i;
                  break;
                }
              }
              if (stIdx !== -1) break;
            }
          }
        }

        // Quy đổi stIdx (0-based) sang kho_id chuẩn của game (1: Nông Sản, 2: Thành Phẩm, 3: Vật Dụng, 4: Khoáng Sản, 5: Sự Kiện)
        var khoId = 2;
        var khoName = "Kho Thành Phẩm";
        if (isEvent || stIdx === 3 || stIdx === 5) {
          khoId = 5;
          khoName = "Kho Sự Kiện";
          isEvent = true;
        } else if (stIdx === 0) {
          khoId = 1;
          khoName = "Kho Nông Sản";
        } else if (stIdx === 1) {
          khoId = 2;
          khoName = "Kho Thành Phẩm";
        } else if (stIdx === 2) {
          khoId = 3;
          khoName = "Kho Vật Dụng";
        } else if (stIdx === 4) {
          khoId = 4;
          khoName = "Kho Khoáng Sản";
        }

        var cap = 9999;
        var cnt = 0;
        if (st) {
          if (typeof st.capacityCurrent === "number" && isFinite(st.capacityCurrent) && st.capacityCurrent >= 0) {
            cnt = st.capacityCurrent;
          } else if (typeof st.itemCount === "number") {
            cnt = st.itemCount;
          }
          cap = (st.capacityMax !== undefined) ? st.capacityMax : (st.maxCapacity || st.capacity || 9999);
          cap = Number(cap) || 0;
        }

        var free = isEvent ? 999999 : Math.max(0, cap - cnt);
        return {
          storageId: khoId,
          storageName: khoName,
          isEvent: isEvent,
          capacityMax: isEvent ? 999999 : cap,
          capacityCurrent: cnt,
          free: free,
          storageObj: st
        };
      } catch (err) {
        return {
          storageId: 2,
          storageName: "Kho Thành Phẩm",
          isEvent: false,
          capacityMax: 9999,
          capacityCurrent: 0,
          free: 9999
        };
      }
    },

    // 10. Quét toàn bộ các ô trong quầy bạn bè (tự co giãn không giới hạn 8 ô + phân loại kho)
    getFriendShopSlots: function () {
      try {
        if (typeof PrivateShop === "undefined") {
          return { success: false, reason: "no_private_shop" };
        }
        var uiOpen = true;
        try {
          if (typeof FWUI !== "undefined" && typeof csp !== "undefined" && csp.uiPrivateShop && typeof FWUI.isShowing === "function") {
            uiOpen = !!FWUI.isShowing(csp.uiPrivateShop, true);
          }
        } catch (eUi) { }
        if (!uiOpen) {
          return { success: false, reason: "ui_closed" };
        }
        var psData = this._getFriendShopData();
        if (psData && this._staleRef && psData === this._staleRef && (Date.now() - (this._openAt || 0)) < 2500) {
          return { success: false, reason: "waiting_server" };
        }
        if (!psData || !psData[4]) {
          return { success: false, reason: "shop_not_open" };
        }

        // Lưu cache để dùng khi mua ô
        this._lastFriendShopData = psData;
        if (PrivateShop.friendId) {
          this._lastFriendId = PrivateShop.friendId;
        }

        // Đọc snapshot dung lượng các kho trong RAM
        var storagesSummary = {};
        try {
          if (typeof gv !== "undefined" && gv.userStorages && gv.userStorages.storages) {
            var sts = gv.userStorages.storages;
            var KHO_MAP = {
              0: { id: 1, name: "Kho Nông Sản" },
              1: { id: 2, name: "Kho Thành Phẩm" },
              2: { id: 3, name: "Kho Vật Dụng" },
              4: { id: 4, name: "Kho Khoáng Sản" }
            };
            for (var sIdx in KHO_MAP) {
              var sObj = sts[Number(sIdx)];
              if (sObj) {
                var sCap = Number(sObj.capacityMax !== undefined ? sObj.capacityMax : (sObj.maxCapacity || 0)) || 0;
                var sCur = Number(sObj.capacityCurrent !== undefined ? sObj.capacityCurrent : (sObj.itemCount || 0)) || 0;
                var sInfo = KHO_MAP[sIdx];
                storagesSummary[sInfo.id] = {
                  id: sInfo.id,
                  name: sInfo.name,
                  capacityMax: sCap,
                  capacityCurrent: sCur,
                  free: Math.max(0, sCap - sCur)
                };
              }
            }
            storagesSummary[5] = { id: 5, name: "Kho Sự Kiện", capacityMax: 999999, capacityCurrent: 0, free: 999999 };
          }
        } catch (eStg) { }

        var rawSlots = psData[4] || [];
        var slots = [];
        for (var i = 0; i < rawSlots.length; i++) {
          var s = rawSlots[i];
          if (!s || Object.keys(s).length === 0) {
            slots.push({
              index: i,
              isEmpty: true,
              isSold: false,
              isGem: false,
              canBuy: false,
              item: "",
              itemKey: "",
              amount: 0,
              price: 0,
              storageId: 2,
              storageName: "Kho Thành Phẩm",
              isEvent: false,
              storageFree: 0
            });
          } else {
            var isSold = (s["8"] === true || s.isSold === true || s.sold === true);
            var itemId = s["5"] || s.item || s.itemId || "";
            var hasItem = !!itemId;
            var priceType = (s.priceType !== undefined ? s.priceType : (s.moneyType || 0));
            var isGem = (priceType === 2 || priceType === 3 || s.isGem === true || s.useDiamond === true || s.isRuby === true);
            var canBuy = hasItem && !isSold && !isGem;
            var itemKey = (typeof resolveItemKey === "function") ? resolveItemKey(itemId) : itemId;
            var stgInfo = this._getStorageInfoForItem(itemId, itemKey);

            slots.push({
              index: i,
              isEmpty: !hasItem,
              isSold: isSold,
              isGem: isGem,
              canBuy: canBuy,
              item: itemId,
              itemKey: itemKey,
              amount: s["6"] || s.amount || 0,
              price: s["7"] || s.price || 0,
              storageId: stgInfo.storageId,
              storageName: stgInfo.storageName,
              isEvent: stgInfo.isEvent,
              storageFree: stgInfo.free
            });
          }
        }
        return { success: true, totalSlots: slots.length, slots: slots, storages: storagesSummary };
      } catch (e) {
        return { success: false, error: String(e) };
      }
    },

    // 11. Mua 1 ô trên quầy bạn bè (Chặn tuyệt đối mua bằng Kim Cương & Chặn khi đầy kho)
    buyFriendSlot: function (slotIndex) {
      try {
        if (typeof PrivateShop === "undefined") {
          return { success: false, reason: "no_private_shop" };
        }
        if (typeof PrivateShop.onSlotSelected !== "function") {
          return { success: false, reason: "onSlotSelected_not_func" };
        }

        var psData = this._getFriendShopData();
        if (!psData || !psData[4]) {
          return { success: false, reason: "shop_not_open" };
        }

        var rawSlots = psData[4];
        if (!rawSlots || !rawSlots[slotIndex]) {
          return { success: false, reason: "slot_data_missing" };
        }
        var e = rawSlots[slotIndex];

        // Chặn mua nếu ô dùng Kim Cương / Ruby
        var priceType = (e.priceType !== undefined ? e.priceType : (e.moneyType || 0));
        if (priceType === 2 || priceType === 3 || e.isGem === true || e.useDiamond === true || e.isRuby === true) {
          return { success: false, reason: "gem_slot_blocked" };
        }

        // Chặn mua nếu ô đã bán hoặc rỗng
        if (e["8"] === true || e.isSold === true || e.sold === true) {
          return { success: false, reason: "already_sold" };
        }

        // Kiểm tra dung lượng kho trước khi bấm mua: Chặn tuyệt đối popup "Kho đã đầy"
        var amount = e["6"] || e.amount || 1;
        var itemId = e["5"] || e.item || e.itemId || "";
        var itemKey = (typeof resolveItemKey === "function") ? resolveItemKey(itemId) : itemId;
        var stgInfo = this._getStorageInfoForItem(itemId, itemKey);

        if (!stgInfo.isEvent) {
          if (stgInfo.storageObj && typeof stgInfo.storageObj.canAddItem === "function") {
            try {
              if (stgInfo.storageObj.canAddItem(amount, itemId) === false) {
                return {
                  success: false,
                  reason: "storage_full",
                  storageId: stgInfo.storageId,
                  storageName: stgInfo.storageName,
                  free: stgInfo.free,
                  amount: amount
                };
              }
            } catch (_) { }
          }
          if (stgInfo.free < amount) {
            return {
              success: false,
              reason: "storage_full",
              storageId: stgInfo.storageId,
              storageName: stgInfo.storageName,
              free: stgInfo.free,
              amount: amount
            };
          }
        }

        // Đồng bộ dữ liệu gian hàng đang mở vào PrivateShop
        PrivateShop.privateShop = psData;
        if (!PrivateShop.friendId) {
          PrivateShop.friendId = psData[0] || psData.friendId || psData.userId || this._lastFriendId || null;
        }

        // Reset cờ nghẽn mạng client
        if (typeof PrivateShop.isRequesting !== "undefined") {
          PrivateShop.isRequesting = false;
        }

        var widget = null;
        if (typeof PrivateShop.getSlotList === "function") {
          try {
            var r = PrivateShop.getSlotList();
            if (r && r[slotIndex]) {
              widget = r[slotIndex];
              PrivateShop.currentSlotWidget = widget;
            }
          } catch (err) { }
        }

        // Chỉ mua bằng đúng luồng click của game: widget thật của ô -> PrivateShop.onSlotSelected(widget)
        if (!widget) {
          return { success: false, reason: "slot_widget_missing" };
        }
        if (typeof PrivateShop.onSlotSelected !== "function") {
          return { success: false, reason: "onSlotSelected_not_func" };
        }

        // Gán dữ liệu ô vào widget (game đọc sender.uiData)
        widget.uiData = e;
        widget.data = slotIndex;
        if (!widget.uiDef) widget.uiDef = { visible: "data.index >= 0" };

        PrivateShop.buyFriendItemPos = slotIndex;
        PrivateShop.currentSlotUiData = e;

        // Widget không phải node Cocos -> bổ sung hàm node còn thiếu (chỉ phục vụ hiệu ứng bay)
        var _pt = { x: 0, y: 0 };
        var _stubs = {
          convertToWorldSpaceAR: function () { return _pt; },
          convertToWorldSpace: function () { return _pt; },
          convertToNodeSpaceAR: function () { return _pt; },
          getPosition: function () { return _pt; },
          getPositionX: function () { return 0; },
          getPositionY: function () { return 0; },
          getContentSize: function () { return { width: 100, height: 100 }; },
          getTag: function () { return slotIndex; }
        };
        for (var sk in _stubs) {
          if (typeof widget[sk] !== "function") {
            try { widget[sk] = _stubs[sk]; } catch (_) { }
          }
        }

        try {
          PrivateShop.onSlotSelected(widget);
        } catch (selErr) {
          return { success: false, error: String(selErr) };
        }

        // Đánh dấu ô đã mua trong cache cục bộ
        e["8"] = true;
        e.isSold = true;

        return { success: true, slot: slotIndex };
      } catch (e) {
        return { success: false, error: String(e) };
      }
    },

    // 11b. Lam moi du lieu quay ban be NGAY TRONG luc quay dang mo (khong dong quay)
    refreshFriendShop: function (friendId) {
      try {
        if (typeof PrivateShop === "undefined" || typeof PrivateShop.showFriendPrivateShop !== "function") {
          return { success: false, reason: "no_method" };
        }
        var fd = PrivateShop.friendData;
        var fid = friendId || PrivateShop.friendId || (fd ? (fd[1] || fd.userId || fd.friendId) : null);
        this._staleRef = this._getFriendShopData();
        this._openAt = Date.now();
        PrivateShop.showFromNewsBoard = false;
        if (fd) {
          PrivateShop.showFriendPrivateShop(fd);
        } else if (fid) {
          PrivateShop.showFriendPrivateShop({ 1: Number(fid), userId: Number(fid), friendId: Number(fid) });
        } else {
          return { success: false, reason: "no_friend_id" };
        }
        return { success: true, method: "showFriendPrivateShop", friendId: fid };
      } catch (e) {
        return { success: false, error: String(e) };
      }
    },

    // 12. Đóng quầy bạn bè
    closeFriendShop: function () {
      try {
        if (typeof PrivateShop !== "undefined" && typeof PrivateShop.hide === "function") {
          PrivateShop.hide();
          this._lastFriendShopData = null;
          this._staleRef = null;
          return { success: true };
        }
        return { success: false, reason: "no_hide_func" };
      } catch (e) {
        return { success: false, error: String(e) };
      }
    }
  };

  // Đọc dung lượng các kho (RAM, không gọi mạng) + kho đang chứa từng item
  ShopEngine.getStorageStatus = function (itemKeys) {
    try {
      if (typeof gv === "undefined" || !gv.userStorages || !gv.userStorages.storages) {
        return { success: false, reason: "no_storage" };
      }
      var NAMES = ["Kho Nông Sản", "Kho Thành Phẩm", "Kho Vật Dụng", "Kho Sự Kiện", "Kho Khoáng Sản", "Túi Đồ Khác"];
      var sts = gv.userStorages.storages;
      var out = [];
      var itemMap = {};
      for (var i = 0; i < sts.length; i++) {
        var st = sts[i];
        if (!st) continue;
        var cnt = 0;
        var its = st.items || st.stock || {};
        for (var k in its) {
          var it = its[k];
          if (it && it.itemAmount > 0) {
            cnt += it.itemAmount;
            itemMap[String(it.itemId || k).toUpperCase()] = i;
          }
        }
        if (typeof st.capacityCurrent === "number" && isFinite(st.capacityCurrent) && st.capacityCurrent >= 0) {
          cnt = st.capacityCurrent;
        }
        var cap = (st.capacityMax !== undefined) ? st.capacityMax : (st.maxCapacity || st.capacity || 9999);
        cap = Number(cap) || 0;
        out.push({ id: i, name: NAMES[i] || ("Kho #" + i), itemCount: cnt, capacityMax: cap, free: cap - cnt });
      }
      var itemStorage = {};
      var known = {};
      var keys = itemKeys || [];
      for (var j = 0; j < keys.length; j++) {
        var key = keys[j];
        known[key] = !!ITEM_MAPPING[key];
        var sid = itemMap[String(resolveItemId(key)).toUpperCase()];
        itemStorage[key] = (sid === undefined) ? -1 : sid;
      }
      return { success: true, storages: out, itemStorage: itemStorage, known: known };
    } catch (e) {
      return { success: false, error: String(e) };
    }
  };

  // Về nhà mình bằng engine (GardenManager.changeGarden về mainUserId)
  ShopEngine.goHome = function () {
    try {
      if (typeof Game !== "undefined" && typeof Game.isFriendGarden === "function" && !Game.isFriendGarden()) {
        return { success: true, already: true };
      }
      if (typeof GardenManager === "undefined" || typeof GardenManager.changeGarden !== "function") {
        return { success: false, reason: "no_changeGarden" };
      }
      if (typeof gv === "undefined" || !gv.mainUserData) {
        return { success: false, reason: "no_user" };
      }
      try { ShopEngine.closeFriendShop(); } catch (eC) { }
      GardenManager.changeGarden(gv.mainUserData.mainUserId, "", "", "");
      return { success: true };
    } catch (e) {
      return { success: false, error: String(e) };
    }
  };

  // Mở quầy hàng cá nhân (100% chuẩn xác theo engine KVTM)
  function openShop() {
    try {
      if (typeof gv !== "undefined" && gv.userData && gv.userData.privateShop) {
        if (typeof PrivateShop !== "undefined" && typeof PrivateShop.show === "function") {
          // Xóa sạch cờ bảng tin/bạn bè để không bị hiện nhầm giao diện Bảng Tin (bóng ma giao diện)
          PrivateShop.friendId = null;
          PrivateShop.friendData = null;
          PrivateShop.showFromNewsBoard = false;
          PrivateShop.showFromEvent = false;
          PrivateShop.showFromEventBoard = false;
          PrivateShop.showFromEventShop = false;

          PrivateShop.privateShop = gv.userData.privateShop;
          PrivateShop.show();
          return true;
        }
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  // Đóng quầy hàng cá nhân
  function closeShop() {
    try {
      if (typeof PrivateShop !== "undefined" && typeof PrivateShop.hide === "function") {
        PrivateShop.friendId = null;
        PrivateShop.friendData = null;
        PrivateShop.showFromNewsBoard = false;
        PrivateShop.hide();
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  // ==========================================================================
  // MACHINE ENGINE - SAN XUAT VAT PHAM BANG HAM UI GOC CUA GAME
  // ==========================================================================
  var MachineEngine = {
    _getInfo: function (itemKey, bosx) {
      if (typeof gv === "undefined" || !gv.userMachine) {
        return { success: false, reason: "no_user_machine" };
      }
      var productId = resolveItemId(itemKey);
      var prodCfg = (typeof g_PRODUCT !== "undefined" && productId) ? g_PRODUCT[productId] : null;
      if (!prodCfg) {
        return { success: false, reason: "unknown_product", itemKey: itemKey, productId: productId };
      }
      var machineId = prodCfg.MACHINE_ID;
      var machine = gv.userMachine.getMachineById(machineId);
      if (!machine) {
        return { success: false, reason: "no_machine", machineId: machineId, productId: productId };
      }
      var floorId = Number(machine.floorId);
      var bosxStr = String(bosx || "1").trim();
      var targetFloor = (bosxStr === "1") ? floorId : Math.max(0, floorId - 1);
      return {
        success: true,
        itemKey: itemKey,
        productId: productId,
        prodCfg: prodCfg,
        machineId: machineId,
        machine: machine,
        floorId: floorId,
        targetFloor: targetFloor
      };
    },

    _getNetStatus: function () {
      var netClient = (typeof network !== "undefined" && network.connector && network.connector.client)
        ? network.connector.client
        : null;
      var isConnected = netClient ? (netClient.isConnected !== false) : true;
      var isKicked = netClient ? (netClient.isKicked === true) : false;
      return { isConnected: isConnected, isKicked: isKicked };
    },

    _getMaxDurabilityAndRepairPrice: function (machine) {
      var floorId = Number(machine.floorId);
      var machineId = machine.machineId;
      var machineDefine = (typeof g_MACHINE !== "undefined") ? g_MACHINE[machineId] : machine.machineDefine;
      var machineData = (gv.userData && gv.userData.game && gv.userData.game[GAME_FLOORS] && gv.userData.game[GAME_FLOORS][floorId])
        ? gv.userData.game[GAME_FLOORS][floorId][FLOOR_MACHINE]
        : machine.data;
      var level = Number(machine.level || (machineData ? machineData[MACHINE_LEVEL] : 1)) || 1;
      var levelIdx = Math.max(level - 1, 0);
      var levelData = (machineDefine && machineDefine.LEVELS) ? machineDefine.LEVELS[levelIdx] : null;
      var maxDur = machineDefine ? (Number(machineDefine.DURABILITY_INIT) + levelIdx * Number(machineDefine.DURABILITY_ADD)) : (Number(machine.maxDurability) || 0);
      var curDur = Number(machine.durability !== undefined ? machine.durability : (machineData ? machineData[MACHINE_DURABILITY] : 0)) || 0;
      var repairPrice = 0;
      if (machineData && machineData[MACHINE_GOLD_REPAIR] != null) {
        repairPrice = Number(machineData[MACHINE_GOLD_REPAIR]) * (maxDur > curDur ? 1 : 0);
      } else if (levelData && maxDur > curDur) {
        repairPrice = (maxDur - curDur) * (Number(levelData.GOLD_MAINTAIN) || 0);
      }
      return {
        curDurability: curDur,
        maxDurability: maxDur,
        repairPrice: Math.max(0, repairPrice)
      };
    },

    run: function (msg) {
      try {
        var op = msg.op;
        var net = this._getNetStatus();

        if (op === "CLOSE") {
          try {
            if (typeof FWUI !== "undefined" && gv && gv.userMachine) {
              if (typeof UI_MACHINE_PRODUCE !== "undefined" && FWUI.isShowing(UI_MACHINE_PRODUCE) && gv.userMachine.popupMachineProduce) {
                gv.userMachine.popupMachineProduce.onButtonCloseTouched();
              }
              if (typeof UI_MACHINE_INFO !== "undefined" && FWUI.isShowing(UI_MACHINE_INFO) && gv.userMachine.popupMachineInfo) {
                gv.userMachine.popupMachineInfo.onButtonCloseTouched();
              }
              if (typeof UI_MACHINE_UPGRADE !== "undefined" && FWUI.isShowing(UI_MACHINE_UPGRADE) && gv.userMachine.popupMachineUpgrade) {
                gv.userMachine.popupMachineUpgrade.onButtonCloseTouched();
              }
              if (typeof UI_MACHINE_UNLOCK !== "undefined" && FWUI.isShowing(UI_MACHINE_UNLOCK) && gv.userMachine.popupMachineUnlock) {
                gv.userMachine.popupMachineUnlock.onButtonCloseTouched();
              }
            }
          } catch (eCl) { }
          return { success: true, isConnected: net.isConnected, isKicked: net.isKicked };
        }

        var info = this._getInfo(msg.itemKey, msg.bosx);
        if (!info.success) {
          info.isConnected = net.isConnected;
          info.isKicked = net.isKicked;
          return info;
        }

        var m = info.machine;
        var prodCfg = info.prodCfg;
        var curFloor = (typeof gv !== "undefined" && gv.background && gv.background.floorIndex !== undefined)
          ? Number(gv.background.floorIndex)
          : -99;
        var runningActions = 0;
        try {
          if (gv.background && gv.background.base && typeof gv.background.base.getNumberOfRunningActions === "function") {
            runningActions = Number(gv.background.base.getNumberOfRunningActions()) || 0;
          }
        } catch (eAct) { }

        if (op === "SNAP_FLOOR") {
          if (curFloor !== info.targetFloor) {
            if (gv.background && typeof gv.background.snapFloor === "function") {
              var baseIdx = (typeof BG !== "undefined" && BG.FLOOR_BASE_INDEX !== undefined) ? BG.FLOOR_BASE_INDEX : 0;
              gv.background.snapFloor(info.targetFloor, baseIdx);
            }
          }
          var afterFloor = (gv.background && gv.background.floorIndex !== undefined) ? Number(gv.background.floorIndex) : curFloor;
          var afterRunning = 0;
          try {
            if (gv.background && gv.background.base && typeof gv.background.base.getNumberOfRunningActions === "function") {
              afterRunning = Number(gv.background.base.getNumberOfRunningActions()) || 0;
            }
          } catch (eAct2) { }
          return {
            success: true,
            floorIndex: afterFloor,
            targetFloor: info.targetFloor,
            runningActions: afterRunning,
            floorAligned: (afterFloor === info.targetFloor && afterRunning === 0)
          };
        }

        if (op === "CLEAR_FRIEND_REPAIR") {
          var friendKey = (typeof MACHINE_FRIEND_ID !== "undefined") ? MACHINE_FRIEND_ID : 11;
          var hasFriend = !!(m.data && m.data[friendKey]);
          if (hasFriend) {
            m.onTouchEnded(null, null, true, false);
          }
          return {
            success: true,
            hadFriendRepair: hasFriend,
            friendRepairId: (m.data && m.data[friendKey]) ? String(m.data[friendKey]) : ""
          };
        }

        if (op === "REPAIR") {
          var durInfo = this._getMaxDurabilityAndRepairPrice(m);
          if (durInfo.curDurability >= durInfo.maxDurability || durInfo.repairPrice <= 0) {
            return {
              success: true,
              repaired: false,
              reason: "already_full",
              durability: durInfo.curDurability,
              maxDurability: durInfo.maxDurability,
              repairPrice: 0
            };
          }
          var enoughGold = (gv.userData && typeof gv.userData.isEnoughGold === "function")
            ? gv.userData.isEnoughGold(durInfo.repairPrice)
            : ((Number(gv.userData ? gv.userData.gold : 0) || 0) >= durInfo.repairPrice);
          if (!enoughGold) {
            return {
              success: false,
              repaired: false,
              reason: "not_enough_gold",
              durability: durInfo.curDurability,
              maxDurability: durInfo.maxDurability,
              repairPrice: durInfo.repairPrice
            };
          }
          var pos = (typeof m.getWorldPosition === "function") ? m.getWorldPosition() : null;
          if (!pos && typeof cc !== "undefined" && cc.p) pos = cc.p(500, 500);
          var consumed = (typeof Game !== "undefined" && typeof Game.consumeGold === "function")
            ? Game.consumeGold(durInfo.repairPrice, pos)
            : true;
          if (consumed) {
            gv.userMachine.requestRepairMachine(info.machineId);
            try {
              if (typeof FWUI !== "undefined" && typeof UI_MACHINE_INFO !== "undefined" && FWUI.isShowing(UI_MACHINE_INFO) && gv.userMachine.popupMachineInfo) {
                gv.userMachine.popupMachineInfo.onButtonCloseTouched();
              }
            } catch (eRI) { }
            return {
              success: true,
              repaired: true,
              repairPrice: durInfo.repairPrice,
              durabilityBefore: durInfo.curDurability,
              maxDurability: durInfo.maxDurability
            };
          }
          return { success: false, repaired: false, reason: "consume_gold_failed" };
        }

        if (op === "HARVEST_ONE") {
          var prodSt = (gv.userStorages && typeof gv.userStorages.getStorage === "function" && typeof STORAGE_TYPE_PRODUCT !== "undefined")
            ? gv.userStorages.getStorage(STORAGE_TYPE_PRODUCT)
            : (gv.userStorages && gv.userStorages.storages ? gv.userStorages.storages[1] : null);
          var capCur = prodSt ? (Number(prodSt.capacityCurrent) || 0) : 0;
          var capMax = prodSt ? (Number(prodSt.capacityMax) || 999999) : 999999;
          var isFull = (gv.userStorages && typeof gv.userStorages.isFullStorage === "function" && typeof STORAGE_TYPE_PRODUCT !== "undefined")
            ? !!gv.userStorages.isFullStorage(STORAGE_TYPE_PRODUCT)
            : (capCur >= capMax);
          if (isFull || capCur >= capMax) {
            return {
              success: false,
              reason: "storage_full",
              capCurrent: capCur,
              capMax: capMax,
              itemsOnMachine: (m.storage && m.storage.length) ? m.storage.length : 0
            };
          }
          var lenBefore = (m.storage && m.storage.length) ? m.storage.length : 0;
          if (lenBefore <= 0) {
            return {
              success: false,
              reason: "empty_machine_storage",
              capCurrent: capCur,
              capMax: capMax,
              itemsOnMachine: 0
            };
          }
          m.onTouchEnded(null, null, true, false);
          return {
            success: true,
            itemsBefore: lenBefore,
            capBefore: capCur,
            capMax: capMax
          };
        }

        if (op === "OPEN_PRODUCE") {
          try {
            if (typeof FWPool !== "undefined" && typeof UI_MACHINE_PRODUCE !== "undefined") {
              var w = FWPool.getNode(UI_MACHINE_PRODUCE, false);
              if (w && w.isHiding) w.isHiding = false;
            }
          } catch (eW) { }

          var alreadyShowing = (typeof FWUI !== "undefined" && typeof UI_MACHINE_PRODUCE !== "undefined")
            ? !!FWUI.isShowing(UI_MACHINE_PRODUCE)
            : false;
          var popup = gv.userMachine.popupMachineProduce;
          if (alreadyShowing && popup && popup.machineId === info.machineId) {
            return { success: true, popupOpen: true, alreadyOpen: true };
          }
          if (m.storage && m.storage.length === 0) {
            m.onTouchEnded(null, null, true, false);
          } else {
            m.onTouchEnded(null, null, true, true);
          }
          var nowShowing = (typeof FWUI !== "undefined" && typeof UI_MACHINE_PRODUCE !== "undefined")
            ? !!FWUI.isShowing(UI_MACHINE_PRODUCE)
            : false;
          if (!nowShowing && typeof m.showPopupProduce === "function" && !m.isBroken() && m.isUnlocked()) {
            m.showPopupProduce();
            nowShowing = (typeof FWUI !== "undefined" && typeof UI_MACHINE_PRODUCE !== "undefined")
              ? !!FWUI.isShowing(UI_MACHINE_PRODUCE)
              : false;
          }
          return {
            success: nowShowing,
            popupOpen: nowShowing,
            state: Number(m.state),
            durability: Number(m.durability) || 0
          };
        }

        if (op === "SELECT_PAGE") {
          var isShowing = (typeof FWUI !== "undefined" && typeof UI_MACHINE_PRODUCE !== "undefined")
            ? !!FWUI.isShowing(UI_MACHINE_PRODUCE)
            : false;
          var pop = gv.userMachine.popupMachineProduce;
          if (!isShowing || !pop || !pop.panelProductItems || !pop.panelProductItems.uiDef) {
            return { success: false, reason: "popup_not_open" };
          }
          var pItems = pop.panelProductItems.uiDef.items || [];
          var foundIdx = -1;
          for (var i = 0; i < pItems.length; i++) {
            if (pItems[i] && pItems[i].itemId === info.productId) {
              foundIdx = i;
              break;
            }
          }
          if (foundIdx < 0) {
            return { success: false, reason: "item_not_in_popup", productId: info.productId };
          }
          if (pItems[foundIdx].itemLocked === true) {
            return {
              success: false,
              reason: "item_locked",
              productId: info.productId,
              unlockLevel: pItems[foundIdx].itemLevel
            };
          }
          var targetPage = Math.floor(foundIdx / 5);
          var curPage = Number(pop.panelProductItems.uiCurrentPage) || 0;
          var changed = (curPage !== targetPage);
          if (changed && typeof pop.selectProductPage === "function") {
            pop.selectProductPage(targetPage);
          }
          return {
            success: true,
            pageChanged: changed,
            fromPage: curPage,
            toPage: targetPage,
            itemIndex: foundIdx,
            productId: info.productId
          };
        }

        if (op === "SKIP_DIAMOND") {
          var isShowingSkip = (typeof FWUI !== "undefined" && typeof UI_MACHINE_PRODUCE !== "undefined")
            ? !!FWUI.isShowing(UI_MACHINE_PRODUCE)
            : false;
          var popSkip = gv.userMachine.popupMachineProduce;
          if (!isShowingSkip || !popSkip) {
            return { success: false, reason: "popup_not_open" };
          }
          var prodLen = (m.producingItems && m.producingItems.length) ? m.producingItems.length : 0;
          if (prodLen <= 0) {
            return { success: false, reason: "not_producing", freeSlots: Number(m.slotCount) || 0 };
          }
          if (typeof popSkip.updateProducing === "function") {
            popSkip.updateProducing(0);
          }
          var skipCoin = Math.max(0, Number(popSkip.producingSkipCoin) || 0);
          var userCoin = (gv.userData && typeof gv.userData.getCoin === "function")
            ? (Number(gv.userData.getCoin()) || 0)
            : (gv.userData ? (Number(gv.userData.coin) || 0) : 0);
          if (userCoin < skipCoin) {
            return {
              success: false,
              reason: "not_enough_diamond",
              diamond: userCoin,
              skipCoin: skipCoin,
              freeSlots: Math.max(0, (Number(m.slotCount) || 0) - prodLen)
            };
          }
          popSkip.onButtonMachineProduceSkipTouched(popSkip.buttonSkip);
          return {
            success: true,
            skipCoin: skipCoin,
            diamondBefore: userCoin,
            producingBefore: prodLen
          };
        }

        if (op === "PRODUCE_ONE") {
          var isShowingProd = (typeof FWUI !== "undefined" && typeof UI_MACHINE_PRODUCE !== "undefined")
            ? !!FWUI.isShowing(UI_MACHINE_PRODUCE)
            : false;
          var popProd = gv.userMachine.popupMachineProduce;
          if (!isShowingProd || !popProd) {
            return { success: false, reason: "popup_not_open" };
          }
          if (gv.userData && typeof gv.userData.isEnoughLevel === "function" && !gv.userData.isEnoughLevel(prodCfg.LEVEL_UNLOCK)) {
            return { success: false, reason: "item_locked", unlockLevel: prodCfg.LEVEL_UNLOCK };
          }
          if ((Number(m.durability) || 0) <= 0) {
            return { success: false, reason: "machine_broken" };
          }
          if (typeof m.isFullSlot === "function" && m.isFullSlot()) {
            return { success: false, reason: "slot_full" };
          }
          if (typeof m.willFullStorage === "function" && m.willFullStorage()) {
            return { success: false, reason: "machine_storage_full" };
          }
          var reqMap = prodCfg.REQUIRE_ITEM || {};
          for (var rId in reqMap) {
            var rAmt = Number(reqMap[rId]) || 1;
            var rStock = (gv.userStorages && typeof gv.userStorages.getItemAmount === "function")
              ? (Number(gv.userStorages.getItemAmount(rId)) || 0)
              : 0;
            var isPlantReq = (typeof g_PLANT !== "undefined" && g_PLANT[rId] !== undefined);
            if (isPlantReq ? (rStock - rAmt < 1) : (rStock < rAmt)) {
              return {
                success: false,
                reason: "insufficient_material",
                itemId: rId,
                itemKey: resolveItemKey(rId),
                stock: rStock,
                reqAmount: rAmt,
                isPlant: isPlantReq
              };
            }
          }
          var productItems = Object.keys(reqMap).map(function (itemId) {
            return { itemId: itemId, amount: reqMap[itemId], requireAmount: reqMap[itemId] };
          });
          popProd.startProduce(info.productId, productItems);
          if (typeof m.refreshNotification === "function") {
            m.refreshNotification();
          }
          return {
            success: true,
            productId: info.productId
          };
        }

        // Default / op === "STATUS"
        var durSt = this._getMaxDurabilityAndRepairPrice(m);
        var friendKeySt = (typeof MACHINE_FRIEND_ID !== "undefined") ? MACHINE_FRIEND_ID : 11;
        var friendRepairId = (m.data && m.data[friendKeySt]) ? String(m.data[friendKeySt]) : "";
        var itemsOnMachine = (m.storage && m.storage.length) ? m.storage.length : 0;
        var slotCount = Number(m.slotCount) || 0;
        var producingCount = (m.producingItems && m.producingItems.length) ? m.producingItems.length : 0;
        var freeSlots = Math.max(0, slotCount - producingCount);
        var timeLeft = 0;
        var duration = 0;
        if (producingCount > 0 && typeof m.getProducingTime === "function") {
          var pt = m.getProducingTime();
          if (pt) {
            timeLeft = Math.max(0, Number(pt.timeLeft) || 0);
            duration = Math.max(0, Number(pt.duration) || 0);
          }
        }
        var popupOpen = (typeof FWUI !== "undefined" && typeof UI_MACHINE_PRODUCE !== "undefined")
          ? !!FWUI.isShowing(UI_MACHINE_PRODUCE)
          : false;
        var popSt = gv.userMachine.popupMachineProduce;
        var skipCoinSt = 0;
        if (producingCount > 0 && popSt) {
          if (popupOpen && typeof popSt.updateProducing === "function") {
            try { popSt.updateProducing(0); } catch (eUp) { }
          }
          skipCoinSt = Math.max(0, Number(popSt.producingSkipCoin) || 0);
        } else if (producingCount > 0 && typeof Game !== "undefined" && typeof Game.getSkipTimeDiamond === "function") {
          try {
            var prodItem0 = m.getProducingItem();
            var pt0 = m.getProducingTime();
            if (prodItem0 && pt0) {
              skipCoinSt = Math.max(0, Number(Game.getSkipTimeDiamond(prodItem0, 0, 0, pt0.timeEnd).diamond) || 0);
            }
          } catch (eSk) { }
        }

        var prodSt2 = (gv.userStorages && typeof gv.userStorages.getStorage === "function" && typeof STORAGE_TYPE_PRODUCT !== "undefined")
          ? gv.userStorages.getStorage(STORAGE_TYPE_PRODUCT)
          : (gv.userStorages && gv.userStorages.storages ? gv.userStorages.storages[1] : null);
        var capCur2 = prodSt2 ? (Number(prodSt2.capacityCurrent) || 0) : 0;
        var capMax2 = prodSt2 ? (Number(prodSt2.capacityMax) || 999999) : 999999;

        var gold = (gv.userData && typeof gv.userData.getGold === "function")
          ? (Number(gv.userData.getGold()) || 0)
          : (gv.userData ? (Number(gv.userData.gold) || 0) : 0);
        var diamond = (gv.userData && typeof gv.userData.getCoin === "function")
          ? (Number(gv.userData.getCoin()) || 0)
          : (gv.userData ? (Number(gv.userData.coin) || 0) : 0);
        var userLevel = (gv.userData && typeof gv.userData.getLevel === "function")
          ? (Number(gv.userData.getLevel()) || 0)
          : (gv.userData ? (Number(gv.userData.level) || 0) : 0);

        var reqs = [];
        var minMaxBatches = 999999;
        var reqObj = prodCfg.REQUIRE_ITEM || {};
        var expectedList = Array.isArray(msg.expectedMaterials) ? msg.expectedMaterials : [];
        for (var reqId in reqObj) {
          var reqAmount = Number(reqObj[reqId]) || 1;
          var stock = (gv.userStorages && typeof gv.userStorages.getItemAmount === "function")
            ? (Number(gv.userStorages.getItemAmount(reqId)) || 0)
            : 0;
          var isPlant = (typeof g_PLANT !== "undefined" && g_PLANT[reqId] !== undefined);
          var maxBatches = isPlant
            ? Math.max(0, Math.floor((stock - 1) / reqAmount))
            : Math.floor(stock / reqAmount);
          if (maxBatches < minMaxBatches) minMaxBatches = maxBatches;
          var matchedExpected = [];
          for (var ei = 0; ei < expectedList.length; ei++) {
            var expKey = expectedList[ei];
            if (resolveItemId(expKey) === reqId) {
              matchedExpected.push(expKey);
            }
          }
          reqs.push({
            itemId: reqId,
            itemKey: resolveItemKey(reqId),
            reqAmount: reqAmount,
            stock: stock,
            isPlant: isPlant,
            maxBatches: maxBatches,
            matchedExpected: matchedExpected
          });
        }
        if (minMaxBatches === 999999) minMaxBatches = 0;

        return {
          success: true,
          isConnected: net.isConnected,
          isKicked: net.isKicked,
          itemKey: info.itemKey,
          productId: info.productId,
          unlockLevel: Number(prodCfg.LEVEL_UNLOCK) || 0,
          itemLocked: (userLevel > 0 && (Number(prodCfg.LEVEL_UNLOCK) || 0) > userLevel),
          machineId: info.machineId,
          floorId: info.floorId,
          targetFloor: info.targetFloor,
          floorIndex: curFloor,
          runningActions: runningActions,
          floorAligned: (curFloor === info.targetFloor && runningActions === 0),
          state: Number(m.state),
          isUnlocked: (typeof m.isUnlocked === "function") ? !!m.isUnlocked() : (slotCount > 0),
          isBroken: (typeof m.isBroken === "function") ? !!m.isBroken() : (durSt.curDurability <= 0),
          durability: durSt.curDurability,
          maxDurability: durSt.maxDurability,
          repairPrice: durSt.repairPrice,
          friendRepairId: friendRepairId,
          itemsOnMachine: itemsOnMachine,
          slotCount: slotCount,
          producingCount: producingCount,
          freeSlots: freeSlots,
          timeLeft: timeLeft,
          duration: duration,
          skipCoin: skipCoinSt,
          popupOpen: popupOpen,
          capCurrent: capCur2,
          capMax: capMax2,
          isStorageFull: (capCur2 >= capMax2),
          gold: gold,
          diamond: diamond,
          userLevel: userLevel,
          requirements: reqs,
          maxBatchesByMaterial: minMaxBatches
        };
      } catch (e) {
        return { success: false, error: String(e) };
      }
    }
  };

  // Helper tra cứu vật phẩm
  function getItem(key) {
    return ITEM_MAPPING[key] || null;
  }

  global.ITEM_MAPPING = ITEM_MAPPING;
  global.KVTMAgent = {
    jumpToFloor: jumpToFloor,
    openShop: openShop,
    closeShop: closeShop,
    getItem: getItem,
    resolveItemId: resolveItemId,
    resolveItemKey: resolveItemKey,
    ShopEngine: ShopEngine,
    MachineEngine: MachineEngine,
    ITEM_MAPPING: ITEM_MAPPING,
    getSocket: function () { return ws; }
  };

  // Watchdog: tu hoi phuc khi socket ket (dang noi qua lau / mat PONG / khong co ket noi nao) - khong can khoi dong lai game
  function dropSocket() {
    var w = ws;
    ws = null;
    if (w) { try { w.onopen = w.onmessage = w.onerror = w.onclose = null; w.close(); } catch (eC) { } }
    if (reconnectTimer) { clearTimeout(reconnectTimer); reconnectTimer = null; }
    reconnectTimer = setTimeout(initWebSocket, 500);
  }
  setInterval(function () {
    try {
      var now = Date.now();
      if (!ws) { if (!reconnectTimer) initWebSocket(); return; }
      if (ws.readyState === 0) { if (now - wsStartedAt > 6000) dropSocket(); return; }
      if (ws.readyState === 1) {
        if (wsPongSeen && now - wsLastRx > 15000) { dropSocket(); return; }
        ws.send(JSON.stringify({ cmd: "PING" }));
        return;
      }
      dropSocket();
    } catch (eW) { }
  }, 5000);

  setTimeout(initWebSocket, 1000);
})("undefined" != typeof window ? window : "undefined" != typeof global ? global : this);
