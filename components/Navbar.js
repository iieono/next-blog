import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";


export default function Navbar(){

    const { user, username } = useContext(UserContext)
    // const user = true
    // const username = true


    return(
        <nav className="navbar">
            <ul>
                <Link href='/'>
                    <button>FEED</button>
                </Link>

                {username && (
                    <>
                    <li className="push-left">
                        <Link href='/admin'>
                            <button className="btn-blue">Write Posts</button>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/${username}`}>
                            <img src={user?.photoURL || 'holder.png' }></img>
                        </Link>
                    </li>
                    </>
                )}
                {!username &&(
                    <li>
                        <Link href='/enter'>
                            <button className="btn-blue">Log in</button>
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}