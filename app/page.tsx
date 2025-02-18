import { Cursor } from "./component/cursor";
import {
  HomeIcon,
  UserIcon,
  InformationCircleIcon,
  PhoneIcon,
  CreditCardIcon,
  MapPinIcon,
  IdentificationIcon
} from "@heroicons/react/24/solid";

const Page = () => {
  return (
    <div className="bg-gray-100 min-h-screen overflow-hidden cursor-none">
      <Cursor />
      {/* ヘッダー */}
      <header className="bg-blue-500 text-white py-4 px-8 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">〇〇銀行</h1>
        <nav>
          <ul className="flex space-x-6">
            <li className="flex items-center space-x-1">
              <HomeIcon className="w-5 h-5" />
              <a href="#" className="hover:underline">ホーム</a>
            </li>
            <li className="flex items-center space-x-1">
              <UserIcon className="w-5 h-5" />
              <a href="#" className="hover:underline">サービス</a>
            </li>
            <li className="flex items-center space-x-1">
              <InformationCircleIcon className="w-5 h-5" />
              <a href="#" className="hover:underline">会社情報</a>
            </li>
            <li className="flex items-center space-x-1">
              <PhoneIcon className="w-5 h-5" />
              <a href="#" className="hover:underline">お問い合わせ</a>
            </li>
            <li><button className="border border-white text-white px-4 py-2">ログイン</button></li>
          </ul>
        </nav>
      </header>

      {/* ヒーローセクション */}
      <section className="bg-blue-400 text-white pt-8 pb-1 text-center">
        <h2 className="text-4xl font-bold mb-4">信頼できる銀行パートナー</h2>
        <p className="text-lg mb-6">安全・信頼・簡単なバンキング</p>
        <button className="bg-white text-blue-800 font-semibold px-6 py-3">今すぐ始める</button>
        <div className="max-w-6xl mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-white p-6 rounded-lg flex flex-col items-center">
            <IdentificationIcon className="w-20 h-20 " />
            <p className="text-2xl">口座を開設する</p>
          </div>
          <div className="border border-white p-6 rounded-lg flex flex-col items-center">
            <CreditCardIcon className="w-20 h-20 " />
            <p className="text-2xl">クレジットカード</p>
          </div>
          <div className="border border-white p-6 rounded-lg flex flex-col items-center">
            <MapPinIcon className="w-20 h-20 " />
            <p className="text-2xl">店舗•ATM</p>
          </div>
        </div>
      </section>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto pt-10 pb-3 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h3 className="text-xl font-semibold mb-2">個人向けバンキング</h3>
          <p className="text-gray-600">貯金、ローン、投資を簡単に管理できます。</p>
        </div>
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h3 className="text-xl font-semibold mb-2">法人向けバンキング</h3>
          <p className="text-gray-600">ビジネスを成長させる金融ソリューション。</p>
        </div>
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h3 className="text-xl font-semibold mb-2">オンラインサービス</h3>
          <p className="text-gray-600">どこでも、いつでも安全なバンキングを。</p>
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-blue-900 text-white py-6 text-center mt-12">
        <p className="text-sm">&copy; 2025 〇〇銀行. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Page;