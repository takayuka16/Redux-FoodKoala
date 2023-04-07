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
              <Link to="/">
                <li>メニュー</li>
              </Link>
              <Link to="/shops">
                <li>ショップ</li>
              </Link>
              <Link to="/favorites">
                <li>お気に入り</li>
              </Link>
              <Link to="/order_history">
                <li>注文履歴</li>
              </Link>
              <Link to="/login">
                <li>ログイン</li>
              </Link>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
