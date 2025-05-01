// Foot.jsx
import React from 'react';

const Footer = () => {
    return (
        <section id="footer">
            <ul className="icons">
                <li>
                    <a href="https://twitter.com/your_twitter_handle" className="icon brands fa-twitter"> {/* 適切な URL に変更 */}
                        <span className="label">Twitter</span>
                    </a>
                </li>
                <li>
                    <a href="https://facebook.com/your_facebook_page" className="icon brands fa-facebook-f"> {/* 適切な URL に変更 */}
                        <span className="label">Facebook</span>
                    </a>
                </li>
                <li>
                    <a href="https://instagram.com/your_instagram_handle" className="icon brands fa-instagram"> {/* 適切な URL に変更 */}
                        <span className="label">Instagram</span>
                    </a>
                </li>
                <li>
                    <a href="/rss" className="icon solid fa-rss"> {/* 適切な URL に変更 */}
                        <span className="label">RSS</span>
                    </a>
                </li>
                <li>
                    <a href="mailto:your_email@example.com" className="icon solid fa-envelope"> {/* 適切なメールアドレスに変更 */}
                        <span className="label">Email</span>
                    </a>
                </li>
            </ul>
            <p className="copyright">
                &copy; Untitled. Design: <a href="https://github.com/banmaJump">Banma</a>.
                Images: <a href="/profile">taz</a>. {/* "/profile" は意図通りですか？ */}
            </p>
        </section>
    );
};

export default Footer;