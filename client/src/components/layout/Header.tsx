import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div>

<nav>
                <Link href="/" legacyBehavior>
                    <a>Home</a>
                </Link>
                <Link href="/about" legacyBehavior>
                    <a>About Us</a>
                </Link>



                <Link href="/products" legacyBehavior>
                    <a>Product</a>
                </Link>

                
                <Link href="/contact" legacyBehavior>
                    <a>Contact Us</a>
                </Link>


            </nav>


    </div>
  )
}

export default Header