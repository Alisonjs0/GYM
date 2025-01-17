import styles from "../styles/dashboard.module.css"

export interface MenuSectionProps {
    icon: React.ReactElement;
    title: string;
}

export default function MenuSection ({ icon, title }: MenuSectionProps): any {
    return (
        <div className={styles.menus}>
            <div className="text-[#F4F4F5] text-7xl mb-8 ">{icon}</div>
            <div className="text-[#F4F4F5] text-md text-xl">{title}</div>
        </div>
    );
};