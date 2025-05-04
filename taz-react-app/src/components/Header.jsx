// /taz-react-app/src/components/Header.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/css/styles.css'; // または './Header.css'

const Header = () => {
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [menuVisible, setMenuVisible] = useState(false);
    const searchInputRef = useRef(null);
    const navigate = useNavigate();

    const handleSearchClick = (event) => {
        event.preventDefault();
        setSearchVisible(!searchVisible);
        if (!searchVisible) {
            searchInputRef.current.focus();
        }
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchInputBlur = () => {
        setTimeout(() => {
            setSearchVisible(false);
        }, 100);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const query = searchQuery.trim();
        if (!query || typeof query !== 'string' || query.length > 100) {
            alert('検索キーワードが不正です。');
            return;
        }
        if (query.length < 1) {
            alert('検索語は1文字以上で入力してください');
            return;
        }
        navigate(`/search?query=${encodeURIComponent(query)}`);
        setSearchQuery(''); // 検索後、入力欄をクリア
        setSearchVisible(false); // 検索後、検索バーを閉じる
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 27 && searchVisible) {
                searchInputRef.current.blur();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [searchVisible]);

    const handleMenuClick = (event) => {
        event.preventDefault();
        setMenuVisible(!menuVisible);
    };

    const closeMenu = () => {
        setMenuVisible(false);
    };

    return (
        <header id="header">
            <h1><a href="/">Taz=Bones</a></h1>
            <nav className="links">
                <ul>
                    <li><a href="/">ホーム</a></li>
                    <li><a href="/profile">遍歴</a></li>
                    <li><a href="/articles">ブログ</a></li>
                    <li><a href="/contact_us">コンタクト</a></li>
                    <li><a href="/social_media">各種SNS</a></li>
                </ul>
            </nav>
            <nav className="main">
                <ul>
                    <li className="search">
                        <li className="search">
                            <div className="search-icon-wrapper" onClick={() => {
                                if (searchVisible && searchInputRef.current) {
                                    handleSearchSubmit({ preventDefault: () => { } }); // フォーム送信
                                } else {
                                    handleSearchClick({ preventDefault: () => { } }); // 検索バー表示
                                    setTimeout(() => {
                                        searchInputRef.current.focus();
                                    }, 100);
                                }
                            }}>
                                <a className="fa-search" href="#search" tabIndex="-1" aria-label="検索"></a> {/* アイコンのみ */}
                            </div>
                            <form id="search" className={searchVisible ? 'visible' : ''} onSubmit={handleSearchSubmit}>
                                <input
                                    type="text"
                                    name="query"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={handleSearchInputChange}
                                    onBlur={handleSearchInputBlur}
                                    ref={searchInputRef}
                                />
                            </form>
                        </li>
                        <form id="search" className={searchVisible ? 'visible' : ''} onSubmit={handleSearchSubmit}>
                            <input
                                type="text"
                                name="query"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                                onBlur={handleSearchInputBlur}
                                ref={searchInputRef}
                            />
                        </form>
                    </li>
                    <li className="menu">
                        <a className="fa-bars" href="#menu" onClick={handleMenuClick}>Menu</a>
                    </li>
                </ul>
            </nav>
            {menuVisible && <div className="menu-overlay" onClick={closeMenu}></div>}
            <section id="menu" className={menuVisible ? 'is-menu-visible' : ''}>
                <section>
                    <form className="search" onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            name="query"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            onBlur={handleSearchInputBlur}
                            ref={searchInputRef}
                        />
                    </form>
                </section>
                <section>
                    <ul className="links">
                        <li><a href="/" onClick={closeMenu}><h3>ホーム</h3><p>Feugiat tempus veroeros dolor</p></a></li>
                        <li><a href="/profile" onClick={closeMenu}><h3>遍歴</h3><p>Sed vitae justo condimentum</p></a></li>
                        <li><a href="/articles" onClick={closeMenu}><h3>ブログ</h3><p>Phasellus sed ultricies mi congue</p></a></li>
                        <li><a href="/contact_us" onClick={closeMenu}><h3>コンタクト</h3><p>Porta lectus amet ultricies</p></a></li>
                    </ul>
                </section>
                <section>
                    <ul className="actions stacked">
                        <li><button className="button large fit" onClick={closeMenu}>Log In</button></li>
                    </ul>
                </section>
            </section>
        </header>
    );
};

export default Header;