import { Cursor } from "./component/cursor-follow";

const Page = () => {
  return (
    <div className="w-screen h-screen overflow-hidden cursor-none flex justify-center items-center">
      <h1 className="text-2xl font-bold text-center">Identicon Cursor Demo</h1>
      <Cursor />
    </div>
  );
};

export default Page;