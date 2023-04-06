import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <header>
        <div>
          <Link to="/">
            <img
              src="/images/header_logo.png"
              alt="header-logo"
              width={170}
              height={170}
            />
          </Link>
        </div>
        <div>
          <nav>
            <ul>
              <li>メニュー</li>
              <li>ショップ</li>
              <li>お気に入り</li>
              <li>注文履歴</li>
              <li>ログイン</li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
