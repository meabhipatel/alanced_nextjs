import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold">Page Not Found</h2>
      <p className="mt-1 text-gray-500/70">Could not find requested resource</p>
      <Link
        href="/"
        className="mt-3 text-sm text-blue-700/70 hover:text-blue-700 hover:underline"
      >
        Return Hom
      </Link>
    </div>
  );
};

export default NotFound;
