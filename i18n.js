/* YuuZ Scripts — lightweight, offline, client-side interface translations.
   Public script titles, authors, descriptions, and Lua are NEVER machine-translated.
   Languages: Indonesian, English, Thai, Filipino, Japanese, Simplified Chinese,
   Korean, Vietnamese, Spanish. No external translation API or key is required. */
(() => {
  'use strict';
  const languages = ['en','th','fil','ja','zh-CN','ko','vi','es'];
  const localeName = { id:'id-ID', en:'en-US', th:'th-TH', fil:'fil-PH', ja:'ja-JP', 'zh-CN':'zh-CN', ko:'ko-KR', vi:'vi-VN', es:'es-ES' };
  const labels = {id:'ID',en:'EN',th:'TH',fil:'PH',ja:'JP','zh-CN':'CN',ko:'KR',vi:'VN',es:'ES'};
  const storage = 'yuuz-language-v14';
  const translations = Object.fromEntries(languages.map(code => [code,new Map()]));
  function add(base, ...terms) { languages.forEach((lang, index) => {if (terms[index]) translations[lang].set(base, terms[index]);}); }

  // Navigation, language controls and loading.
  add('Pilih bahasa','Choose language','เลือกภาษา','Pumili ng wika','言語を選択','选择语言','언어 선택','Chọn ngôn ngữ','Elegir idioma');
  add('Pilihan bahasa','Languages','ภาษา','Mga wika','言語','语言选项','언어 목록','Ngôn ngữ','Idiomas');
  add('Tampilan website','Website interface','ภาษาเว็บไซต์','Wika ng website','サイトの表示言語','网站界面语言','웹사이트 언어','Ngôn ngữ giao diện','Idioma de la web');
  add('Pilihan tersimpan di perangkat ini.','Saved on this device.','บันทึกการเลือกไว้ในอุปกรณ์นี้','Naka-save sa device na ito.','この端末に保存されます。','选择已保存在此设备上。','이 기기에 저장됩니다.','Được lưu trên thiết bị này.','Guardado en este dispositivo.');
  add('Menyiapkan katalog script untukmu','Preparing your script catalog','กำลังเตรียมรายการสคริปต์','Inihahanda ang mga script','スクリプト一覧を準備中','正在准备脚本目录','스크립트 목록 준비 중','Đang chuẩn bị danh mục script','Preparando el catálogo de scripts');
  add('Discover','Explore','สำรวจ','Tuklasin','探す','探索','탐색','Khám phá','Explorar');
  add('Trending','Trending','ยอดนิยม','Trending','トレンド','热门','인기','Xu hướng','Tendencias');
  add('Tersimpan','Saved','บันทึกแล้ว','Naka-save','保存済み','已收藏','저장됨','Đã lưu','Guardados');
  add('Executors','Executors','เอ็กซีคิวเตอร์','Executors','実行ツール','执行器','실행 도구','Executor','Ejecutores');
  add('Credits','Credits','ผู้จัดทำ','Credits','クレジット','制作人员','제작진','Đội ngũ','Créditos');
  add('Workspace','Workspace','พื้นที่ทำงาน','Workspace','ワークスペース','工作区','작업 공간','Không gian','Área de trabajo');
  add('Navigasi utama','Main navigation','การนำทางหลัก','Pangunahing menu','メインナビ','主导航','기본 탐색','Điều hướng chính','Navegación principal');
  add('YuuZ Scripts — ke Discover','YuuZ Scripts — go to Explore','YuuZ Scripts — ไปสำรวจ','YuuZ Scripts — pumunta sa Tuklasin','YuuZ Scripts — 探す','YuuZ Scripts — 前往探索','YuuZ Scripts — 탐색','YuuZ Scripts — Khám phá','YuuZ Scripts — explorar');
  add('Memuat katalog YuuZ Scripts','Loading YuuZ Scripts catalog','กำลังโหลดรายการ YuuZ Scripts','Nilo-load ang YuuZ Scripts','YuuZ Scripts を読み込み中','正在加载 YuuZ Scripts','YuuZ Scripts 로딩 중','Đang tải YuuZ Scripts','Cargando YuuZ Scripts');

  // V16: compact filters under the search box.
  add('Filter & Urutan','Filter & Sort','กรองและเรียงลำดับ','Filter at Ayusin','絞り込みと並べ替え','筛选与排序','필터 및 정렬','Lọc và sắp xếp','Filtrar y ordenar');
  add('Buka atau tutup filter pencarian','Open or close search filters','เปิดหรือปิดตัวกรอง','Buksan o isara ang mga filter','検索フィルターを開閉','打开或关闭搜索筛选','검색 필터 열기 또는 닫기','Mở hoặc đóng bộ lọc','Abrir o cerrar filtros de búsqueda');
  add('Jenis, game/map, tahun, dan tanggal','Type, game/map, year and date','ประเภท เกม/แมพ ปี และวันที่','Uri, game/map, taon at petsa','種類、ゲーム、年、日付','类型、游戏/地图、年份和日期','종류, 게임/맵, 연도, 날짜','Loại, game/map, năm và ngày','Tipo, juego/mapa, año y fecha');
  add('Lihat hasil','View results','ดูผลลัพธ์','Tingnan ang resulta','結果を見る','查看结果','결과 보기','Xem kết quả','Ver resultados');
  // V15 new scope, map and creation-date controls (nine languages).
  add('Filter script','Script filters','ตัวกรองสคริปต์','Mga filter ng script','スクリプト絞り込み','脚本筛选','스크립트 필터','Bộ lọc script','Filtros de scripts');
  add('Reset semua','Reset all','รีเซ็ตทั้งหมด','I-reset lahat','すべてリセット','全部重置','모두 초기화','Đặt lại tất cả','Restablecer todo');
  add('Cakupan script','Script scope','ประเภทสคริปต์','Uri ng script','対象範囲','脚本范围','스크립트 범위','Phạm vi script','Alcance del script');
  add('Semua Script','All scripts','สคริปต์ทั้งหมด','Lahat ng script','すべてのスクリプト','所有脚本','모든 스크립트','Tất cả script','Todos los scripts');
  add('Khusus Game / Map','Specific game / map','เฉพาะเกม / แผนที่','Para sa game / map','特定ゲーム / マップ','指定游戏 / 地图','특정 게임 / 맵','Theo game / map','Juego / mapa específico');
  add('Nama game/map atau Place ID','Game/map name or Place ID','ชื่อเกม/แมพ หรือ Place ID','Pangalan ng game/map o Place ID','ゲーム/マップ名または Place ID','游戏/地图名称或 Place ID','게임/맵 이름 또는 Place ID','Tên game/map hoặc Place ID','Nombre del juego/mapa o Place ID');
  add('Filter nama game atau Place ID','Filter game name or Place ID','กรองชื่อเกมหรือ Place ID','I-filter ang game o Place ID','ゲーム名またはPlace IDで絞る','按游戏名称或 Place ID 筛选','게임 이름 또는 Place ID 필터','Lọc tên game hoặc Place ID','Filtrar juego o Place ID');
  add('Tahun dibuat','Year created','ปีที่สร้าง','Taon ng paggawa','作成年','创建年份','생성 연도','Năm tạo','Año de creación');
  add('(halaman ini)','(this page)','(หน้านี้)','(pahinang ito)','（このページ）','（当前页）','(이 페이지)','(trang này)','(esta página)');
  add('Semua tahun','All years','ทุกปี','Lahat ng taon','すべての年','全部年份','모든 연도','Tất cả năm','Todos los años');
  add('Urutkan berdasarkan','Sort by','เรียงตาม','Ayusin ayon sa','並べ替え','排序方式','정렬 기준','Sắp xếp theo','Ordenar por');
  add('Terakhir diperbarui','Recently updated','อัปเดตล่าสุด','Huling na-update','最近更新','最近更新','최근 업데이트','Cập nhật mới nhất','Actualizados recientemente');
  add('Terbaru dibuat','Newest created','สร้างใหม่ที่สุด','Pinakabagong ginawa','作成日が新しい順','创建时间最新','최신 생성순','Mới tạo nhất','Creados más recientes');
  add('Terlama dibuat','Oldest created','สร้างเก่าที่สุด','Pinakalumang ginawa','作成日が古い順','创建时间最早','오래된 생성순','Tạo lâu nhất','Creados más antiguos');
  add('Paling lama diperbarui','Least recently updated','อัปเดตนานที่สุด','Pinakamatagal nang na-update','更新日が古い順','最早更新','오래된 업데이트순','Cập nhật cũ nhất','Actualizados hace más tiempo');
  add('Tahun dipilih hanya menyaring script pada halaman hasil ini. Gunakan urutan terbaru/terlama untuk mengurutkan seluruh katalog.','Year selection only filters this results page. Use newest/oldest sorting to order the full catalog.','การเลือกปีกรองเฉพาะหน้านี้ ใช้การเรียงใหม่สุด/เก่าสุดกับทั้งแค็ตตาล็อก','Ang taon ay para lamang sa pahinang ito. Gamitin ang newest/oldest sort para sa buong katalogo.','年の絞り込みはこのページのみです。全体の並び替えには作成日順を使用してください。','年份仅筛选当前页。要排序整个目录，请使用最新/最旧创建时间。','연도 필터는 현재 페이지만 적용됩니다. 전체 목록 정렬은 최신/오래된 생성순을 이용하세요.','Bộ lọc năm chỉ áp dụng cho trang này. Dùng thứ tự mới nhất/cũ nhất để sắp xếp toàn bộ danh mục.','El filtro de año solo afecta esta página. Usa la ordenación por fecha para todo el catálogo.');
  add('Nama game/map dicocokkan pada hasil pencarian halaman ini. Untuk filter game paling akurat, gunakan Place ID.','Game/map names are matched on this results page. For precise game filtering, use a Place ID.','ชื่อเกม/แมพจะกรองเฉพาะหน้านี้ ใช้ Place ID เพื่อความแม่นยำ','Ang pangalan ng game/map ay sinusuri sa pahinang ito. Gumamit ng Place ID para mas tumpak.','ゲーム/マップ名の照合はこのページのみです。正確な絞り込みにはPlace IDを使ってください。','游戏名称仅匹配当前页的结果。精确筛选请使用 Place ID。','게임/맵 이름은 현재 페이지 결과에서만 일치 검색합니다. 정확한 필터에는 Place ID를 사용하세요.','Tên game/map chỉ khớp trên trang này. Dùng Place ID để lọc chính xác hơn.','Los nombres de juegos/mapas se filtran en esta página. Usa Place ID para mayor precisión.');
  add('Dibuat','Created','สร้างเมื่อ','Ginawa','作成','创建于','생성','Tạo ngày','Creado');
  add('Belum ada script yang cocok di halaman ini. Ubah filter atau coba halaman berikutnya.','No matching scripts on this page. Change filters or try the next page.','ไม่พบสคริปต์ในหน้านี้ ลองเปลี่ยนตัวกรองหรือหน้าถัดไป','Walang tugma sa pahinang ito. Baguhin ang filter o tingnan ang susunod.','このページには一致するスクリプトがありません。別のページか条件をお試しください。','本页暂无匹配脚本，请调整筛选或查看下一页。','이 페이지에 일치하는 스크립트가 없습니다. 필터를 바꾸거나 다음 페이지를 확인하세요.','Không có script phù hợp trên trang này. Đổi bộ lọc hoặc xem trang tiếp.','No hay scripts coincidentes en esta página. Cambia los filtros o sigue a la siguiente.');

  // Discover and search.
  add('Temukan script.','Find scripts.','ค้นหาสคริปต์','Maghanap ng script.','スクリプトを探そう。','发现脚本。','스크립트 찾기.','Khám phá script.','Encuentra scripts.');
  add('Tanpa batas.','Without limits.','ไร้ขีดจำกัด','Walang limitasyon.','制限なく。','无限探索。','한계 없이.','Không giới hạn.','Sin límites.');
  add('Semua script Roblox favoritmu, dalam satu tempat. Cari, temukan, dan simpan dengan mudah.','All your favorite Roblox scripts in one place. Search, discover and save with ease.','รวมสคริปต์ Roblox ที่ชอบไว้ที่เดียว ค้นหาและบันทึกได้ง่าย','Lahat ng paborito mong Roblox scripts sa iisang lugar. Maghanap at mag-save nang madali.','お気に入りのRobloxスクリプトを1か所で検索・保存。','所有你喜欢的 Roblox 脚本尽在一处，轻松搜索和收藏。','좋아하는 Roblox 스크립트를 한곳에서 검색하고 저장하세요.','Tất cả script Roblox yêu thích ở một nơi. Tìm và lưu dễ dàng.','Tus scripts favoritos de Roblox en un solo lugar. Busca y guarda fácilmente.');
  add('Mulai Jelajahi','Start exploring','เริ่มสำรวจ','Simulang tumuklas','探し始める','开始探索','탐색 시작','Khám phá ngay','Empezar a explorar');
  add('Total script tersedia','Total scripts available','สคริปต์ทั้งหมด','Kabuuang scripts','利用可能なスクリプト','可用脚本总数','전체 스크립트','Tổng số script','Scripts disponibles');
  add('Script tersedia','Scripts available','สคริปต์ที่มี','Mga script','利用可能なスクリプト','可用脚本','사용 가능한 스크립트','Script hiện có','Scripts disponibles');
  add('Script trending','Trending scripts','สคริปต์ยอดนิยม','Trending scripts','人気のスクリプト','热门脚本','인기 스크립트','Script xu hướng','Scripts populares');
  add('Koleksi tersimpan','Saved collection','รายการที่บันทึก','Mga naka-save','保存した一覧','已收藏','저장한 목록','Bộ sưu tập đã lưu','Colección guardada');
  add('Cari sesuatu yang keren','Find something great','ค้นหาสิ่งเจ๋งๆ','Humanap ng astig','面白いものを探そう','发现精彩内容','멋진 것을 찾아보세요','Tìm thứ gì hay','Encuentra algo genial');
  add('Katalog komunitas Roblox, selalu diperbarui.','Roblox community catalog, updated regularly.','แค็ตตาล็อกชุมชน Roblox อัปเดตเสมอ','Katalogo ng Roblox community, laging updated.','Robloxコミュニティの最新カタログ。','持续更新的 Roblox 社区目录。','계속 업데이트되는 Roblox 커뮤니티 목록.','Danh mục cộng đồng Roblox luôn được cập nhật.','Catálogo de la comunidad Roblox, siempre actualizado.');
  add('Cari Script','Search scripts','ค้นหาสคริปต์','Maghanap','スクリプト検索','搜索脚本','스크립트 검색','Tìm script','Buscar scripts');
  add('Cari script, game, atau nama creator...','Search scripts, games, or creators...','ค้นหาสคริปต์ เกม หรือผู้สร้าง...','Hanapin ang script, laro o creator...','スクリプト、ゲーム、作者を検索...','搜索脚本、游戏或创作者...','스크립트, 게임, 제작자 검색...','Tìm script, trò chơi, tác giả...','Buscar scripts, juegos o creadores...');
  add('Cari script Roblox','Search Roblox scripts','ค้นหาสคริปต์ Roblox','Maghanap ng Roblox scripts','Robloxスクリプト検索','搜索 Roblox 脚本','Roblox 스크립트 검색','Tìm script Roblox','Buscar scripts de Roblox');
  add('Populer:','Popular:','ยอดนิยม:','Sikat:','人気:','热门:','인기:','Phổ biến:','Popular:');
  add('Trending sekarang','Trending now','มาแรงตอนนี้','Trending ngayon','今のトレンド','当前热门','지금 인기','Đang thịnh hành','Tendencias ahora');
  add('Lihat semua','View all','ดูทั้งหมด','Tingnan lahat','すべて見る','查看全部','모두 보기','Xem tất cả','Ver todo');
  add('Jelajahi semua script','Explore all scripts','สำรวจสคริปต์ทั้งหมด','Tuklasin lahat ng script','すべてのスクリプト','探索全部脚本','모든 스크립트','Khám phá mọi script','Explorar todos los scripts');
  add('Temukan script terbaru dari seluruh komunitas.','Find the latest scripts from the community.','ค้นหาสคริปต์ล่าสุดจากชุมชน','Tingnan ang pinakabagong scripts ng komunidad.','コミュニティの最新スクリプトを探そう。','发现社区最新脚本。','커뮤니티의 최신 스크립트 찾기.','Tìm script mới nhất từ cộng đồng.','Descubre los últimos scripts de la comunidad.');
  add('Script paling trending','Most trending scripts','สคริปต์ยอดนิยมที่สุด','Pinaka-trending na scripts','最も人気のスクリプト','最热门的脚本','최고 인기 스크립트','Script thịnh hành nhất','Scripts más populares');
  add('Script yang sedang populer di komunitas saat ini.','Scripts currently popular in the community.','สคริปต์ที่กำลังฮิตในชุมชน','Mga script na sikat ngayon sa komunidad.','コミュニティで今人気のスクリプト。','当前社区热门的脚本。','지금 커뮤니티에서 인기 있는 스크립트.','Script đang phổ biến trong cộng đồng.','Scripts que están de moda en la comunidad.');
  add('Script tersimpan','Saved scripts','สคริปต์ที่บันทึก','Naka-save na scripts','保存したスクリプト','已收藏脚本','저장된 스크립트','Script đã lưu','Scripts guardados');
  add('Koleksi script favoritmu disimpan di browser ini.','Your favorites are stored in this browser.','รายการโปรดของคุณจะเก็บไว้ในเบราว์เซอร์นี้','Naka-save sa browser na ito ang mga paborito mo.','お気に入りはこのブラウザーに保存されます。','收藏保存在此浏览器中。','즐겨찾기는 이 브라우저에 저장됩니다.','Mục yêu thích lưu trong trình duyệt này.','Tus favoritos se guardan en este navegador.');
  add('Semua','All','ทั้งหมด','Lahat','すべて','全部','전체','Tất cả','Todos');
  add('Gratis','Free','ฟรี','Libre','無料','免费','무료','Miễn phí','Gratis');
  add('Berbayar','Paid','เสียเงิน','Bayad','有料','付费','유료','Trả phí','De pago');
  add('Tanpa Key','No key','ไม่ต้องใช้คีย์','Walang key','キー不要','无需密钥','키 불필요','Không cần key','Sin clave');
  add('Tidak patched','Not patched','ยังไม่ถูกแพตช์','Hindi patched','未パッチ','未修补','패치 안 됨','Chưa bị vá','Sin parchear');
  add('Urutkan:','Sort:','เรียงตาม:','Ayusin:','並び替え:','排序:','정렬:','Sắp xếp:','Ordenar:');
  add('Terbaru','Latest','ล่าสุด','Pinakabago','最新','最新','최신','Mới nhất','Más recientes');
  add('Terpopuler','Most viewed','ดูมากที่สุด','Pinakasikat','閲覧数順','浏览最多','조회순','Xem nhiều nhất','Más vistos');
  add('Paling disukai','Most liked','ถูกใจมากที่สุด','Pinakagusto','高評価順','最多点赞','좋아요순','Thích nhiều nhất','Más valorados');
  add('Baru dibuat','Recently created','สร้างล่าสุด','Bagong gawa','新規作成順','最近创建','최근 제작','Mới tạo','Recién creados');
  add('Memuat script...','Loading scripts...','กำลังโหลดสคริปต์...','Nilo-load ang scripts...','読み込み中...','正在加载脚本...','스크립트 로딩 중...','Đang tải script...','Cargando scripts...');
  add('Mengambil data dari ScriptBlox...','Fetching data from ScriptBlox...','กำลังดึงข้อมูลจาก ScriptBlox...','Kinukuha ang data mula sa ScriptBlox...','ScriptBloxから取得中...','正在从 ScriptBlox 获取数据...','ScriptBlox 데이터 불러오는 중...','Đang lấy dữ liệu từ ScriptBlox...','Obteniendo datos de ScriptBlox...');
  add('Belum ada hasil','No results yet','ยังไม่มีผลลัพธ์','Wala pang resulta','結果がありません','暂无结果','검색 결과 없음','Chưa có kết quả','Sin resultados');
  add('Coba kata kunci lain atau ubah filter pencarian.','Try another keyword or change the filters.','ลองคำอื่นหรือเปลี่ยนตัวกรอง','Subukan ang ibang keyword o filter.','別のキーワードやフィルターをお試しください。','请换一个关键词或筛选条件。','다른 키워드나 필터를 사용하세요.','Thử từ khóa hoặc bộ lọc khác.','Prueba otra búsqueda o filtro.');
  add('Reset pencarian','Reset search','รีเซ็ตการค้นหา','I-reset ang paghahanap','検索をリセット','重置搜索','검색 초기화','Đặt lại tìm kiếm','Restablecer búsqueda');
  add('Sebelumnya','Previous','ก่อนหน้า','Nakaraan','前へ','上一页','이전','Trước','Anterior');
  add('Berikutnya','Next','ถัดไป','Susunod','次へ','下一页','다음','Tiếp','Siguiente');
  add('Lihat Script','View script','ดูสคริปต์','Tingnan script','スクリプトを見る','查看脚本','스크립트 보기','Xem script','Ver script');
  add('Simpan script','Save script','บันทึกสคริปต์','I-save ang script','保存する','收藏脚本','스크립트 저장','Lưu script','Guardar script');
  add('Hapus dari tersimpan','Remove from saved','ลบจากที่บันทึก','Alisin sa naka-save','保存から削除','取消收藏','저장 목록에서 삭제','Xóa khỏi mục đã lưu','Quitar de guardados');

  // Executor directory and errors.
  add('Temukan executor','Find an executor','ค้นหาเอ็กซีคิวเตอร์','Maghanap ng executor','実行ツールを探す','查找执行器','실행 도구 찾기','Tìm executor','Encuentra un ejecutor');
  add('pilihanmu.','you prefer.','ที่คุณต้องการ','na gusto mo.','お気に入りを。','适合你的。','원하는 도구.','phù hợp.','a tu gusto.');
  add('Jelajahi daftar executor Roblox dari ScriptBlox. Bandingkan yang gratis dan berbayar, platform, serta status versi terbaru.','Explore executors from ScriptBlox. Compare free and paid options, platforms, and version status.','ดูรายการเอ็กซีคิวเตอร์จาก ScriptBlox เปรียบเทียบแบบฟรีและเสียเงิน แพลตฟอร์ม และเวอร์ชัน','Tingnan ang executors mula ScriptBlox. Ikumpara ang libre, bayad, platform at version.','ScriptBloxの実行ツールを比較。無料・有料、対応環境、バージョン情報を確認できます。','浏览 ScriptBlox 执行器目录，比较免费/付费、平台和版本状态。','ScriptBlox 실행 도구를 무료/유료, 플랫폼, 버전별로 비교하세요.','Khám phá executor từ ScriptBlox; so sánh miễn phí/trả phí, nền tảng và phiên bản.','Explora ejecutores de ScriptBlox y compara precio, plataforma y versión.');
  add('Katalog dari API publik','Catalog from public API','ข้อมูลจาก API สาธารณะ','Katalogo mula sa public API','公開APIによる一覧','公开 API 目录','공개 API 목록','Danh mục từ API công khai','Catálogo de API pública');
  add('Data dapat diperbarui','Updatable data','อัปเดตข้อมูลได้','Maaaring i-update ang data','データを更新可能','数据可更新','새로고침 가능','Dữ liệu có thể cập nhật','Datos actualizables');
  add('Total executor','Total executors','เอ็กซีคิวเตอร์ทั้งหมด','Kabuuang executors','実行ツール総数','执行器总数','실행 도구 전체','Tổng executor','Total de ejecutores');
  add('Direktori executor','Executor directory','รายการเอ็กซีคิวเตอร์','Direktoryo ng executor','実行ツール一覧','执行器目录','실행 도구 목록','Danh mục executor','Directorio de ejecutores');
  add('Pilih tipe executor yang cocok dengan kebutuhanmu.','Choose an executor type that suits your needs.','เลือกประเภทที่เหมาะกับคุณ','Piliin ang uri na akma sa iyo.','自分に合う種類を選択しましょう。','选择适合你的执行器类型。','필요에 맞는 실행 도구 유형을 선택하세요.','Chọn loại executor phù hợp.','Elige el tipo que necesitas.');
  add('Cari nama atau platform...','Search names or platforms...','ค้นหาชื่อหรือแพลตฟอร์ม...','Maghanap ng pangalan o platform...','名前・プラットフォームで検索...','搜索名称或平台...','이름 또는 플랫폼 검색...','Tìm tên hoặc nền tảng...','Buscar nombre o plataforma...');
  add('Cari executor','Search executors','ค้นหาเอ็กซีคิวเตอร์','Maghanap ng executor','実行ツール検索','搜索执行器','실행 도구 검색','Tìm executor','Buscar ejecutores');
  add('Menyiapkan daftar executor...','Preparing executor list...','กำลังเตรียมรายการ...','Inihahanda ang listahan...','一覧を準備中...','正在准备执行器列表...','목록 준비 중...','Đang chuẩn bị danh sách...','Preparando la lista...');
  add('Tidak ada executor','No executors','ไม่พบเอ็กซีคิวเตอร์','Walang executor','実行ツールがありません','没有执行器','실행 도구 없음','Không có executor','No hay ejecutores');
  add('Coba kata kunci atau filter yang berbeda.','Try another keyword or filter.','ลองคำอื่นหรือตัวกรองอื่น','Subukan ang ibang keyword o filter.','別のキーワードやフィルターをお試しください。','尝试其他关键词或筛选。','다른 키워드나 필터를 사용하세요.','Thử từ khóa hoặc bộ lọc khác.','Prueba otra palabra o filtro.');
  add('Coba lagi','Try again','ลองอีกครั้ง','Subukan ulit','再試行','重试','다시 시도','Thử lại','Reintentar');
  add('Reset filter','Reset filter','รีเซ็ตตัวกรอง','I-reset ang filter','フィルターをリセット','重置筛选','필터 초기화','Đặt lại bộ lọc','Restablecer filtro');
  add('Executor tidak ditemukan','Executor not found','ไม่พบเอ็กซีคิวเตอร์','Walang nahanap na executor','実行ツールが見つかりません','未找到执行器','실행 도구를 찾을 수 없음','Không tìm thấy executor','Ejecutor no encontrado');
  add('Coba filter lain atau ubah kata kunci pencarianmu.','Try another filter or search term.','ลองตัวกรองหรือคำค้นหาอื่น','Subukan ang ibang filter o salita.','別のフィルターや検索語をお試しください。','更换筛选条件或关键词。','필터나 검색어를 바꿔보세요.','Thử bộ lọc hoặc từ khóa khác.','Prueba otro filtro o término.');
  add('Daftar executor belum tersedia','Executor list unavailable','รายการเอ็กซีคิวเตอร์ยังไม่พร้อม','Hindi pa available ang listahan','一覧を取得できません','执行器列表不可用','목록을 불러올 수 없음','Danh sách executor chưa có','Lista no disponible');
  add('Tidak berhasil mengambil data dari API ScriptBlox. Periksa koneksi atau coba lagi nanti.','Could not load the ScriptBlox API. Check your connection or try later.','โหลดข้อมูลจาก ScriptBlox ไม่ได้ ตรวจสอบเน็ตหรือลองใหม่','Hindi makuha ang ScriptBlox data. Suriin ang internet at subukan ulit.','ScriptBlox APIを取得できません。接続を確認し、再試行してください。','无法获取 ScriptBlox 数据，请检查网络后重试。','ScriptBlox API를 불러올 수 없습니다. 연결을 확인하세요.','Không tải được dữ liệu ScriptBlox. Kiểm tra kết nối rồi thử lại.','No se pudieron cargar los datos de ScriptBlox. Revisa tu conexión.');
  add('Informasi berasal dari ScriptBlox dan dapat berubah. Gratis/berbayar bukan jaminan keamanan; periksa situs dan reputasi penyedia sebelum mengunduh. Status patched bukan verifikasi keamanan.','Information comes from ScriptBlox and may change. Free or paid does not guarantee safety; check the provider before downloading. Patch status is not a safety certification.','ข้อมูลมาจาก ScriptBlox และอาจเปลี่ยนแปลง โปรดตรวจสอบผู้ให้บริการก่อนดาวน์โหลด','Ang datos ay mula ScriptBlox at maaaring magbago. Suriin ang provider bago mag-download.','情報はScriptBlox提供で変更される場合があります。ダウンロード前に提供元の安全性を確認してください。','数据来自 ScriptBlox 且可能变化。下载前请核实提供者信誉；状态不代表安全。','정보는 ScriptBlox에서 제공되며 변경될 수 있습니다. 다운로드 전에 제공자를 확인하세요.','Dữ liệu từ ScriptBlox và có thể thay đổi. Kiểm tra nhà cung cấp trước khi tải.','Los datos provienen de ScriptBlox y pueden cambiar. Comprueba al proveedor antes de descargar.');
  add('STATUS','STATUS','สถานะ','STATUS','状態','状态','상태','TRẠNG THÁI','ESTADO');
  add('VERSI','VERSION','เวอร์ชัน','BERSYON','バージョン','版本','버전','PHIÊN BẢN','VERSIÓN');
  add('Belum tersedia','Not available','ยังไม่มี','Hindi available','未提供','暂无','정보 없음','Chưa có','No disponible');
  add('Belum diketahui','Unknown','ไม่ทราบ','Hindi alam','不明','未知','알 수 없음','Chưa rõ','Desconocido');
  add('Platform tidak diketahui','Unknown platform','ไม่ทราบแพลตฟอร์ม','Hindi alam ang platform','不明なプラットフォーム','未知平台','알 수 없는 플랫폼','Không rõ nền tảng','Plataforma desconocida');
  add('Link tidak tersedia','Link unavailable','ไม่มีลิงก์','Walang link','リンクなし','无链接','링크 없음','Không có liên kết','Enlace no disponible');
  add('Update belum diketahui','Update unknown','ไม่ทราบการอัปเดต','Hindi alam ang update','更新日不明','更新日期未知','업데이트 불명','Không rõ bản cập nhật','Actualización desconocida');

  // Credits and detailed script information.
  add('Tim YuuZ Scripts','YuuZ Scripts team','ทีม YuuZ Scripts','Team ng YuuZ Scripts','YuuZ Scriptsチーム','YuuZ Scripts 团队','YuuZ Scripts 팀','Đội ngũ YuuZ Scripts','Equipo YuuZ Scripts');
  add('Developer dan kontributor di balik website ini.','Developers and contributors behind this site.','ทีมพัฒนาและผู้ให้คำแนะนำเบื้องหลังเว็บไซต์','Mga developer at contributor ng website na ito.','サイトを支える開発者と協力者。','网站背后的开发者与贡献者。','사이트를 만든 개발자와 기여자.','Nhà phát triển và cộng tác viên của trang.','Desarrolladores y colaboradores de la web.');
  add('Made by','Made by','สร้างโดย','Gawa ng','制作','打造者','제작','Được tạo bởi','Hecho por');
  add('people.','people.','ผู้คน','tao.','人々。','热爱者。','사람들.','con người.','personas.');
  add('Powered by ideas.','Powered by ideas.','ขับเคลื่อนด้วยไอเดีย','Pinapalakas ng mga ideya.','アイデアを力に。','由创意驱动。','아이디어의 힘.','Thúc đẩy bởi ý tưởng.','Impulsado por ideas.');
  add('Kenalan dengan tim yang mengembangkan YuuZ Scripts serta orang yang memberikan ide dan saran terbaik.','Meet the people developing YuuZ Scripts and sharing great ideas.','ทำความรู้จักทีมพัฒนา YuuZ Scripts และผู้ให้คำแนะนำ','Kilalanin ang developers at mga nagbabahagi ng ideya sa YuuZ Scripts.','YuuZ Scriptsを開発し、アイデアを提供するチームです。','认识开发 YuuZ Scripts 并提供创意与建议的团队。','YuuZ Scripts 개발진과 아이디어 제공자를 만나보세요.','Gặp gỡ đội ngũ phát triển và đóng góp ý tưởng cho YuuZ Scripts.','Conoce al equipo que desarrolla YuuZ Scripts y aporta ideas.');
  add('Tim di balik layar','The people behind it','ทีมเบื้องหลัง','Mga taong nasa likod','開発チーム','幕后团队','만든 사람들','Đội ngũ phía sau','El equipo detrás');
  add('Orang-orang yang ikut membangun dan memberi ide untuk YuuZ Scripts.','People building and contributing ideas to YuuZ Scripts.','ผู้สร้างและให้แนวคิดแก่ YuuZ Scripts','Mga gumagawa at nag-aambag ng ideya para sa YuuZ Scripts.','YuuZ Scriptsの制作・アイデアを支える人々。','参与构建 YuuZ Scripts 并提供创意的成员。','YuuZ Scripts 개발과 아이디어를 지원하는 사람들.','Những người xây dựng và đóng góp ý tưởng cho YuuZ Scripts.','Personas que crean y aportan ideas a YuuZ Scripts.');
  add('Developer YuuZ Scripts','YuuZ Scripts developer','ผู้พัฒนา YuuZ Scripts','Developer ng YuuZ Scripts','YuuZ Scripts 開発者','YuuZ Scripts 开发者','YuuZ Scripts 개발자','Nhà phát triển YuuZ Scripts','Desarrollador de YuuZ Scripts');
  add('Pengembang website dan fitur YuuZ Scripts.','Develops the YuuZ Scripts website and features.','พัฒนาเว็บไซต์และฟีเจอร์ของ YuuZ Scripts','Gumagawa ng website at features ng YuuZ Scripts.','YuuZ Scriptsのサイトと機能を開発。','开发 YuuZ Scripts 网站及功能。','YuuZ Scripts 사이트와 기능 개발.','Phát triển website và tính năng YuuZ Scripts.','Desarrolla el sitio y sus funciones.');
  add('IDE & SARAN','IDEAS & FEEDBACK','ไอเดียและคำแนะนำ','IDEYA & SUHESTIYON','アイデア・提案','创意与建议','아이디어 및 제안','Ý TƯỞNG & GÓP Ý','IDEAS Y SUGERENCIAS');
  add('Kontributor Saran','Ideas contributor','ผู้ให้คำแนะนำ','Contributor ng ideya','アイデア提供者','建议贡献者','아이디어 기여자','Người góp ý','Colaborador de ideas');
  add('Memberikan ide dan masukan untuk pengembangan website.','Shares ideas and feedback to improve the website.','ให้ข้อเสนอแนะเพื่อพัฒนาเว็บไซต์','Nagbibigay ng ideya at feedback para sa website.','サイト改善のアイデアや提案を担当。','为网站开发提供创意与反馈。','사이트 개선 아이디어와 피드백 제공.','Đóng góp ý tưởng và phản hồi cải thiện website.','Aporta ideas y sugerencias para mejorar la web.');
  add('Lencana biru di halaman ini menandai anggota tim YuuZ Scripts, bukan verifikasi akun dari platform lain.','Blue badges identify YuuZ Scripts team members; they are not third-party account verification.','ตราสีฟ้าระบุสมาชิกทีม YuuZ Scripts ไม่ใช่เครื่องหมายยืนยันของแพลตฟอร์มอื่น','Ang blue badge ay tanda ng team, hindi verified account sa ibang platform.','青いバッジはチームメンバーの印であり、他サービスの認証ではありません。','蓝色徽章代表本站团队成员，并非其他平台认证。','파란 배지는 YuuZ Scripts 팀 표시이며 외부 인증이 아닙니다.','Dấu xanh thể hiện thành viên nhóm, không phải xác minh của nền tảng khác.','La insignia azul indica miembros del equipo, no verificación externa.');
  add('Built for the Roblox community.','Built for the Roblox community.','สร้างเพื่อชุมชน Roblox','Para sa Roblox community.','Robloxコミュニティのために。','为 Roblox 社区打造。','Roblox 커뮤니티를 위해.','Dành cho cộng đồng Roblox.','Para la comunidad Roblox.');
  add('Informasi script','Script information','ข้อมูลสคริปต์','Impormasyon ng script','スクリプト情報','脚本信息','스크립트 정보','Thông tin script','Información del script');
  add('INFORMASI SCRIPT','SCRIPT INFORMATION','ข้อมูลสคริปต์','IMPORMASYON NG SCRIPT','スクリプト情報','脚本信息','스크립트 정보','THÔNG TIN SCRIPT','INFORMACIÓN DEL SCRIPT');
  add('Mengambil informasi lengkap script...','Loading full script information...','กำลังโหลดข้อมูลสคริปต์...','Kinukuha ang kumpletong impormasyon...','詳細情報を取得中...','正在加载脚本详情...','스크립트 상세 정보 불러오는 중...','Đang lấy thông tin đầy đủ...','Cargando información completa...');
  add('Baca deskripsi lengkap','Read full description','อ่านคำอธิบายทั้งหมด','Basahin ang buong paglalarawan','説明をすべて読む','展开完整描述','전체 설명 보기','Đọc mô tả đầy đủ','Leer descripción completa');
  add('Ringkas deskripsi','Collapse description','ย่อคำอธิบาย','Paikliin ang paglalarawan','説明を閉じる','收起描述','설명 접기','Thu gọn mô tả','Contraer descripción');
  add('Dilihat','Views','ยอดดู','Mga view','閲覧数','浏览量','조회수','Lượt xem','Vistas');
  add('Suka','Likes','ถูกใจ','Likes','いいね','点赞','좋아요','Lượt thích','Me gusta');
  add('Tidak suka','Dislikes','ไม่ชอบ','Dislikes','低評価','点踩','싫어요','Không thích','No me gusta');
  add('DIUNGGAH OLEH','UPLOADED BY','อัปโหลดโดย','INUPLOAD NI','投稿者','上传者','업로더','ĐĂNG BỞI','SUBIDO POR');
  add('Jenis script','Script type','ประเภทสคริปต์','Uri ng script','種類','脚本类型','스크립트 종류','Loại script','Tipo de script');
  add('Sistem key','Key system','ระบบคีย์','Key system','キー方式','密钥系统','키 시스템','Hệ thống key','Sistema de claves');
  add('Status','Status','สถานะ','Status','状態','状态','상태','Trạng thái','Estado');
  add('Jangkauan','Scope','ขอบเขต','Saklaw','対象','适用范围','범위','Phạm vi','Alcance');
  add('Dibuat','Created','สร้างเมื่อ','Nilikha','作成日','创建日期','작성일','Ngày tạo','Creado');
  add('Diperbarui','Updated','อัปเดต','Na-update','更新日','更新日期','업데이트','Cập nhật','Actualizado');
  add('Game / pengalaman','Game / experience','เกม / ประสบการณ์','Game / karanasan','ゲーム','游戏 / 体验','게임','Trò chơi','Juego');
  add('ID script','Script ID','รหัสสคริปต์','ID ng script','スクリプトID','脚本 ID','스크립트 ID','ID script','ID de script');
  add('TAG SCRIPT','SCRIPT TAGS','แท็กสคริปต์','MGA TAG','タグ','脚本标签','스크립트 태그','THẺ SCRIPT','ETIQUETAS');
  add('Salin kode','Copy code','คัดลอกโค้ด','Kopyahin ang code','コードをコピー','复制代码','코드 복사','Sao chép mã','Copiar código');
  add('Lihat Script Asli','View original script','ดูสคริปต์ต้นฉบับ','Tingnan ang orihinal','元のスクリプトを見る','查看原始脚本','원본 스크립트 보기','Xem script gốc','Ver script original');
  add('Memuat data...','Loading data...','กำลังโหลดข้อมูล...','Nilo-load ang data...','データを読み込み中...','正在加载数据...','데이터 로딩 중...','Đang tải dữ liệu...','Cargando datos...');
  add('Memuat detail...','Loading details...','กำลังโหลดรายละเอียด...','Nilo-load ang detalye...','詳細を読み込み中...','正在加载详情...','상세 정보 로딩 중...','Đang tải chi tiết...','Cargando detalles...');
  add('Detail terbaru','Latest details','รายละเอียดล่าสุด','Pinakabagong detalye','最新情報','最新详情','최신 상세 정보','Chi tiết mới nhất','Detalles recientes');
  add('Data terbatas','Limited data','ข้อมูลจำกัด','Limitadong data','情報が限られています','数据有限','제한된 데이터','Dữ liệu hạn chế','Datos limitados');
  add('Memuat creator...','Loading creator...','กำลังโหลดผู้สร้าง...','Nilo-load ang creator...','作者を読み込み中...','加载创作者...','제작자 로딩 중...','Đang tải tác giả...','Cargando creador...');
  add('Creator belum tersedia','Creator unavailable','ไม่พบผู้สร้าง','Walang creator','作者情報なし','暂无创作者','제작자 정보 없음','Không có tác giả','Creador no disponible');
  add('Informasi creator','Creator information','ข้อมูลผู้สร้าง','Impormasyon ng creator','作者情報','创作者信息','제작자 정보','Thông tin tác giả','Información del creador');
  add('Akun komunitas ScriptBlox','ScriptBlox community account','บัญชีชุมชน ScriptBlox','ScriptBlox community account','ScriptBloxコミュニティアカウント','ScriptBlox 社区账号','ScriptBlox 커뮤니티 계정','Tài khoản cộng đồng ScriptBlox','Cuenta de ScriptBlox');
  add('Terverifikasi oleh ScriptBlox','Verified by ScriptBlox','ยืนยันโดย ScriptBlox','Verified ng ScriptBlox','ScriptBlox認証済み','ScriptBlox 已认证','ScriptBlox 인증','Được ScriptBlox xác minh','Verificado por ScriptBlox');
  add('Key diperlukan','Key required','ต้องใช้คีย์','Kailangan ng key','キーが必要','需要密钥','키 필요','Cần key','Clave necesaria');
  add('Tanpa key','No key','ไม่ต้องใช้คีย์','Walang key','キー不要','无需密钥','키 불필요','Không cần key','Sin clave');
  add('Tidak diketahui','Unknown','ไม่ทราบ','Hindi alam','不明','未知','알 수 없음','Không rõ','Desconocido');
  add('Tidak tersedia','Unavailable','ไม่มีข้อมูล','Hindi available','情報なし','不可用','이용 불가','Không có','No disponible');
  add('Universal Script','Universal Script','สคริปต์สากล','Universal Script','汎用スクリプト','通用脚本','범용 스크립트','Script đa năng','Script universal');
  add('Game tertentu','Specific game','เฉพาะบางเกม','Partikular na game','特定のゲーム','特定游戏','특정 게임','Trò chơi cụ thể','Juego específico');
  add('Kode tidak tersedia dari API. Silakan buka script aslinya.','Code unavailable via API. Open the original script.','ไม่มีโค้ดจาก API กรุณาดูต้นฉบับ','Walang code sa API. Tingnan ang orihinal.','APIからコードを取得できません。元ページをご確認ください。','API 暂无代码，请打开原始脚本。','API 코드가 없습니다. 원본을 확인하세요.','API không có mã. Hãy mở script gốc.','El código no está disponible. Abre el original.');
  add('Buka tautan key dari creator','Open creator key link','เปิดลิงก์คีย์จากผู้สร้าง','Buksan ang key link ng creator','作者のキーリンクを開く','打开作者的密钥链接','제작자 키 링크 열기','Mở liên kết key từ tác giả','Abrir enlace de clave del creador');
  add('Kode dari komunitas pihak ketiga. Periksa sebelum digunakan; label verified atau status aktif bukan jaminan keamanan.','Community code from third parties. Review it before use; verified labels and active status do not guarantee safety.','โค้ดจากบุคคลภายนอก ควรตรวจสอบก่อนใช้ การยืนยันไม่รับประกันความปลอดภัย','Code mula sa third party. Suriin bago gamitin; hindi garantiya ng seguridad ang verified.','第三者が投稿したコードです。使用前に確認してください。認証表示は安全性を保証しません。','第三方社区代码，使用前请检查；认证状态不保证安全。','외부 커뮤니티 코드입니다. 사용 전 확인하세요. 인증 표시가 안전을 보장하지 않습니다.','Mã từ cộng đồng bên thứ ba. Kiểm tra trước khi dùng; nhãn xác minh không đảm bảo an toàn.','Código comunitario de terceros. Revísalo; la verificación no garantiza seguridad.');
  add('Data dan informasi script berasal dari','Script data comes from','ข้อมูลสคริปต์มาจาก','Ang datos ng script ay mula sa','スクリプト情報の提供元:','脚本数据来源：','스크립트 정보 출처:','Dữ liệu script từ','Datos de scripts de');

  // Feedback, error and metadata strings dynamically generated in app.js.
  add('Koleksi pribadi','Personal collection','รายการส่วนตัว','Personal na koleksyon','個人コレクション','个人收藏','개인 목록','Bộ sưu tập cá nhân','Colección personal');
  add('Live trending','Live trending','ยอดนิยมปัจจุบัน','Live trending','現在のトレンド','实时热门','실시간 인기','Thịnh hành trực tiếp','Tendencias en vivo');
  add('Belum ada script tersimpan. Jelajahi dan tekan ikon bookmark.','No saved scripts yet. Explore and tap a bookmark.','ยังไม่มีสคริปต์ที่บันทึก เริ่มสำรวจแล้วกดบุ๊กมาร์ก','Wala pang naka-save. Maghanap at i-bookmark ang scripts.','まだ保存したスクリプトがありません。探して保存しましょう。','还没有收藏脚本。浏览并点击书签即可收藏。','저장한 스크립트가 없습니다. 탐색 후 북마크하세요.','Chưa có script đã lưu. Hãy khám phá và đánh dấu.','Aún no hay guardados. Explora y marca favoritos.');
  add('Script yang cocok dengan pencarianmu.','Scripts matching your search.','สคริปต์ที่ตรงกับการค้นหา','Mga script na tugma sa paghahanap mo.','検索に一致したスクリプト。','与你搜索匹配的脚本。','검색에 일치하는 스크립트.','Script phù hợp với tìm kiếm.','Scripts que coinciden con tu búsqueda.');
  add('Tidak dapat memuat data','Could not load data','โหลดข้อมูลไม่ได้','Hindi ma-load ang data','データを読み込めません','无法加载数据','데이터를 불러올 수 없음','Không thể tải dữ liệu','No se pudieron cargar los datos');
  add('Tidak bisa terhubung ke ScriptBlox','Could not connect to ScriptBlox','เชื่อมต่อ ScriptBlox ไม่ได้','Hindi makakonekta sa ScriptBlox','ScriptBloxに接続できません','无法连接到 ScriptBlox','ScriptBlox 연결 실패','Không kết nối được ScriptBlox','No se pudo conectar a ScriptBlox');
  add('API sedang tidak tersedia, koneksi terputus, atau browser memblokir akses lintas domain. Coba beberapa saat lagi.','The API is unavailable, your connection dropped, or your browser blocked cross-origin access. Please retry.','API อาจไม่พร้อมหรือเครือข่ายมีปัญหา กรุณาลองใหม่','Maaaring offline ang API o may problema sa koneksyon. Subukan ulit.','APIが利用できないか、通信がブロックされています。再試行してください。','API 不可用、网络中断或跨域访问受限，请稍后重试。','API 연결 문제 또는 브라우저 차단이 발생했습니다. 다시 시도하세요.','API lỗi, mạng gián đoạn hoặc trình duyệt chặn truy cập. Hãy thử lại.','API no disponible, conexión interrumpida o bloqueo del navegador. Reintenta.');
  add('Trending belum tersedia','Trending unavailable','ยังไม่มีข้อมูลยอดนิยม','Walang trending ngayon','トレンドを取得できません','暂无热门内容','인기 목록 불가','Chưa có xu hướng','Tendencias no disponibles');
  add('Trending belum dapat dimuat.','Could not load trending.','โหลดเทรนด์ไม่ได้','Hindi ma-load ang trending.','トレンドを読み込めません。','无法加载热门。','인기 목록 불러오기 실패.','Không thể tải xu hướng.','No se pudieron cargar las tendencias.');
  add('Coba muat ulang beberapa saat lagi.','Try reloading in a moment.','ลองโหลดใหม่อีกครั้ง','Subukang i-refresh mamaya.','しばらくしてから再読み込みしてください。','请稍后刷新重试。','잠시 후 다시 불러오세요.','Hãy tải lại sau.','Vuelve a cargar en un momento.');
  add('Script berhasil disimpan','Script saved','บันทึกสคริปต์แล้ว','Na-save ang script','保存しました','已收藏脚本','스크립트 저장됨','Đã lưu script','Script guardado');
  add('Dihapus dari tersimpan','Removed from saved','ลบจากรายการแล้ว','Inalis sa naka-save','保存から削除しました','已取消收藏','저장 목록에서 삭제됨','Đã xóa khỏi mục lưu','Eliminado de guardados');
  add('Kode berhasil disalin!','Code copied!','คัดลอกโค้ดแล้ว!','Nakopya ang code!','コピーしました！','代码已复制！','코드 복사 완료!','Đã sao chép mã!','¡Código copiado!');
  add('Kode script belum tersedia','Script code unavailable','ยังไม่มีโค้ด','Wala pang code','コードがありません','脚本代码不可用','스크립트 코드 없음','Mã script chưa có','Código no disponible');
  add('Salin gagal. Pilih kode secara manual.','Copy failed. Select the code manually.','คัดลอกไม่สำเร็จ กรุณาเลือกโค้ดเอง','Hindi makopya. Piliin ang code nang manual.','コピーに失敗しました。手動で選択してください。','复制失败，请手动选择代码。','복사 실패. 코드를 직접 선택하세요.','Sao chép thất bại. Hãy chọn mã thủ công.','Error al copiar. Selecciona el código manualmente.');
  add('Download dimulai','Download started','เริ่มดาวน์โหลดแล้ว','Nagsimula ang download','ダウンロード開始','已开始下载','다운로드 시작','Đã bắt đầu tải xuống','Descarga iniciada');
  add('Penyimpanan browser tidak tersedia.','Browser storage unavailable.','ไม่สามารถใช้ที่เก็บข้อมูลเบราว์เซอร์','Hindi available ang browser storage.','ブラウザーの保存領域が利用できません。','浏览器存储不可用。','브라우저 저장소 이용 불가.','Bộ nhớ trình duyệt không khả dụng.','Almacenamiento del navegador no disponible.');

  const patternRows = [
    [/^Halaman (\d+) dari (\d+)$/,['Page $1 of $2','หน้า $1 จาก $2','Pahina $1 ng $2','$1 / $2 ページ','第 $1 页，共 $2 页','$1 / $2 페이지','Trang $1 / $2','Página $1 de $2']],
    [/^Halaman (\d+) \/ (\d+)$/,['Page $1 / $2','หน้า $1 / $2','Pahina $1 / $2','$1 / $2 ページ','第 $1 / $2 页','$1 / $2 페이지','Trang $1 / $2','Página $1 / $2']],
    [/^Halaman (\d+)$/,['Page $1','หน้า $1','Pahina $1','$1 ページ','第 $1 页','$1 페이지','Trang $1','Página $1']],
    [/^(\d+) script di halaman ini$/,['$1 scripts on this page','หน้านี้มี $1 สคริปต์','$1 scripts sa pahinang ito','このページに $1 件','本页 $1 个脚本','이 페이지 $1개 스크립트','Trang này có $1 script','$1 scripts en esta página']],
    [/^(\d+) script ditemukan$/,['$1 scripts found','พบ $1 สคริปต์','$1 scripts ang nahanap','$1 件見つかりました','找到 $1 个脚本','$1개 스크립트 검색됨','Tìm thấy $1 script','$1 scripts encontrados']],
    [/^(\d+) dari (\d+) executor$/,['$1 of $2 executors','$1 จาก $2 เอ็กซีคิวเตอร์','$1 sa $2 executors','$1 / $2 件の実行ツール','$1 / $2 个执行器','$1 / $2 실행 도구','$1 / $2 executor','$1 de $2 ejecutores']],
    [/^Hasil untuk “(.+)”$/, ['Results for “$1”','ผลลัพธ์สำหรับ “$1”','Resulta para sa “$1”','「$1」の結果','“$1”的搜索结果','“$1” 검색 결과','Kết quả cho “$1”','Resultados para “$1”']],
    [/^Lua · (\d+) baris · (\d+) karakter$/, ['Lua · $1 lines · $2 characters','Lua · $1 บรรทัด · $2 ตัวอักษร','Lua · $1 linya · $2 character','Lua · $1 行 · $2 文字','Lua · $1 行 · $2 字符','Lua · $1줄 · $2자','Lua · $1 dòng · $2 ký tự','Lua · $1 líneas · $2 caracteres']],
    [/^(\d+(?:[.,]\d+)?) views$/, ['$1 views','$1 ครั้ง','$1 views','$1 回閲覧','$1 次浏览','$1 조회','$1 lượt xem','$1 vistas']],
  ];

  let current = (() => { try {const v=localStorage.getItem(storage);return localeName[v] ? v : 'id';}catch{return 'id';} })();
  const origins = new WeakMap();
  const attrOrigins = new WeakMap();
  const monitoredAttrs = ['placeholder','title','aria-label'];
  const skipSelectors = 'script,style,code,pre,[data-no-translate],.hero-code,.card-title,.trend-title,.game-name,.trend-game,.modal-game,.modal-description,.detail-tags,.executor-name,.executor-platform,.modal-owner,#modalTitle,#modalGame,#modalOwner,#modalCode,#modalDescription,#modalTags,#modalScriptId';

  function localize(value) {
    if (current === 'id' || !value) return value;
    const map = translations[current];
    if (map?.has(value)) return map.get(value);
    for (const [re,replacements] of patternRows) if (re.test(value)) return value.replace(re,replacements[languages.indexOf(current)]);
    return value;
  }
  function keepWhitespace(text) { const m=text.match(/^(\s*)([\s\S]*?)(\s*)$/); return m || ['', '',text,'']; }
  function applyText(target) {
    if (!target || target.nodeType !== Node.TEXT_NODE || !target.parentElement || target.parentElement.closest(skipSelectors)) return;
    const value = target.nodeValue;
    if (!value || !value.trim()) return;
    let state = origins.get(target);
    if (!state || value !== state.rendered) state = {base:value,rendered:value};
    const [,start,middle,end] = keepWhitespace(state.base);
    const rendered = start + localize(middle) + end;
    origins.set(target,{base:state.base,rendered});
    if (value !== rendered) target.nodeValue = rendered;
  }
  function applyAttributes(target) {
    if (!target || target.nodeType !== Node.ELEMENT_NODE || target.matches('script,style,[data-no-translate]')) return;
    let base = attrOrigins.get(target) || {};
    for (const attr of monitoredAttrs) {
      if (!target.hasAttribute(attr)) continue;
      const value=target.getAttribute(attr);
      if (!base[attr] || value !== base[attr].rendered) base[attr]={base:value,rendered:value};
      const rendered=localize(base[attr].base);
      base[attr].rendered=rendered;
      if (value !== rendered) target.setAttribute(attr,rendered);
    }
    attrOrigins.set(target,base);
  }
  function refresh(root=document.body) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) return applyText(root);
    if (root.nodeType !== Node.ELEMENT_NODE) return;
    applyAttributes(root);
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT);
    let item;
    while ((item=walker.nextNode())) {
      if (item.nodeType === Node.TEXT_NODE) applyText(item);
      else applyAttributes(item);
    }
  }
  let pending = new Set(), scheduled=false;
  function onMutation(records) {
    for (const entry of records) {
      if (entry.type === 'characterData') pending.add(entry.target);
      else if (entry.type === 'attributes') pending.add(entry.target);
      else for (const node of entry.addedNodes) pending.add(node);
    }
    if (scheduled) return;
    scheduled=true;
    queueMicrotask(() => {
      scheduled=false;
      const list=[...pending]; pending.clear();
      for (const node of list) refresh(node);
    });
  }
  const picker=document.getElementById('languagePicker');
  const toggle=document.getElementById('languageToggle');
  const menu=document.getElementById('languageMenu');
  const currentLabel=document.getElementById('languageCurrent');
  function closeMenu(focus=false) {
    if (!menu || menu.hidden) return;
    menu.hidden=true;
    toggle?.setAttribute('aria-expanded','false');
    picker?.classList.remove('is-open');
    if(focus)toggle?.focus();
  }
  function openMenu() {
    if (!menu) return;
    menu.hidden=false;
    toggle?.setAttribute('aria-expanded','true');
    picker?.classList.add('is-open');
  }
  function setLanguage(code) {
    if (!localeName[code]) return;
    current=code;
    try{localStorage.setItem(storage,code);}catch{ /* Storage optional. */ }
    document.documentElement.lang=code;
    if (currentLabel) currentLabel.textContent=labels[code];
    menu?.querySelectorAll('.language-option').forEach(option=>{
      const active=option.dataset.lang===code;
      option.classList.toggle('active',active);
      option.setAttribute('aria-checked',String(active));
    });
    refresh();
    closeMenu(true);
    window.dispatchEvent(new CustomEvent('yuuz:languagechange',{detail:{lang:code}}));
  }
  toggle?.addEventListener('click',(event)=>{
    event.stopPropagation();
    if(menu.hidden)openMenu();else closeMenu();
  });
  menu?.querySelectorAll('[data-lang]').forEach(button=>{
    button.setAttribute('role','menuitemradio');
    button.addEventListener('click',()=>setLanguage(button.dataset.lang));
  });
  document.addEventListener('click',event=>{if(!picker?.contains(event.target))closeMenu();});
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape') closeMenu(true);
    if(event.key==='ArrowDown' && document.activeElement===toggle){event.preventDefault();openMenu();menu?.querySelector('button')?.focus();}
  });
  document.documentElement.lang=current;
  if(currentLabel)currentLabel.textContent=labels[current];
  menu?.querySelectorAll('.language-option').forEach(option=>{
    const active=option.dataset.lang===current;
    option.classList.toggle('active',active);
    option.setAttribute('aria-checked',String(active));
  });
  refresh();
  new MutationObserver(onMutation).observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:monitoredAttrs});
  window.YuuZI18n={locale:()=>localeName[current],language:()=>current,translate:localize,refresh,closeMenu};
})();
