import Link from "next/link";
import Button from "@/components/ui/Button";

type Props = {
  label: string;
  href?: string;
  onClick?: () => void;
};

const HeaderItem = ({ label, href, onClick }: Props) => {
  return href ? (
    <Link href={href}>
      <Button label={label} />
    </Link>
  ) : (
    <Button label={label} onClick={onClick} />
  );
};
export default HeaderItem;