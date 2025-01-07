import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    return (
        <>
            <Image className="dark:invert" src="/next.svg" alt="Next.js logo" width={64} height={64} priority />
            {/* Avatar */}
            <div className="flex items-center space-x-2">
                <span className="text-sm">Huy Nguyen</span>
                <FontAwesomeIcon icon={faUser} className="fa-fw" />
            </div>
        </>
    );
}
