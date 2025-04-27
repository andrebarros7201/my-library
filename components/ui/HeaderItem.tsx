import Link from "next/link";

type Props = {
  label: string;
  href?: string;
  onClick?: () => void;
};

const style =
  "px-4 py-2 rounded-md bg-blue-500 text-white shadow-md hover:bg-blue-700 transition-all duration-300 ease-in-out cursor-pointer";

const HeaderItem = ({ label, href, onClick }: Props) => {
  return href ? (
    <Link className={style} href={href}>
      {label}
    </Link>
  ) : (
    <button className={style} onClick={onClick}>
      {label}
    </button>
  );
};
export default HeaderItem;