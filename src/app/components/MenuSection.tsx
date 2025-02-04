import styles from "../styles/dashboard.module.css"
import Link from "next/link";

export interface MenuSectionProps {
    icon: React.ReactElement;
    title: string;
    link: string;
}

export default function MenuSection ({ icon, title, link }: MenuSectionProps) {
    return (
        <Link href={link} className={`${styles.menus} transition-transform hover:scale-105`}>
            <div className="text-[#F4F4F5] text-7xl mb-8 ">{icon}</div>
            <div className="text-[#F4F4F5] text-md text-xl">{title}</div>
        </Link>
    );
};