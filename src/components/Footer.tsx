import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <footer>
        <ul>
          <Link to="/concept">
            <li>コンセプト</li>
          </Link>
          <Link to="/inquiry_form">
            <li>お問い合わせ</li>
          </Link>
        </ul>
      </footer>
    </>
  );
};
