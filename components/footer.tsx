import Link from 'next/link'

const links = [
    {
        title: 'Github',
        href: 'https://github.com/abbashirani',
    },
    {
        title: 'Linkedin',
        href: 'https://www.linkedin.com/in/abbashirani/',
    }
]

export default function FooterSection() {
    return (
        <footer className="border-b bg-white py-12 dark:bg-transparent">
            <div className="mx-auto max-w-5xl px-6">
                <div className="flex flex-wrap justify-between gap-6">
                    <span className="text-muted-foreground order-last block text-center text-sm md:order-first">© {new Date().getFullYear()} NoteSnips, All rights reserved</span>
                    <p 
                    className='text-muted-foreground order-last block text-center text-sm md:order-first' 
                    >
                        <a 
                            target="_blank"
                            rel="noopener noreferrer" 
                            href="https://abbashirani.vercel.app"
                        >
                            Developed and coded by Abbas Hirani
                        </a>
                    </p>
                    <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
                        {links.map((link) => (
                            <Link
                                key={link.title}
                                href={link.href}
                                className="text-muted-foreground transition-colors hover:text-foreground"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {link.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
