import { Menu } from "../../types/menus.type";
import { useGetMenuByIdQuery } from "../api/apiSlice";
import { useParams } from "react-router-dom";

export default function SingleMenuPage() {
  const { itemId } = useParams();

  const {
    data: menuData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMenuByIdQuery(itemId);

  let content;

  if (isLoading) {
    content = <div>Loading now...</div>;
  } else if (isSuccess) {
    const menu: Menu = menuData[0];
    content = (
      <div className="menu">
        <h2>{menu.name}</h2>
        <img src={menu.image_url} alt="メニュー画像" />
        <p>{menu.description}</p>
        <p>{menu.price}円</p>
      </div>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return <div>{content}</div>;
}
