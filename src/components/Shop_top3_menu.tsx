import { useGetMenuByShopIdQuery } from "../features/api/apiSlice";
import type { Menu } from "../types/menus.type";

export default function ShopTop3Menu({ shopId }: { shopId: number }) {
  const {
    data: shopMenu,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMenuByShopIdQuery(shopId);

  let content;

  if (isLoading) {
    content = <></>;
  } else if (isSuccess) {
    let menus;
    if (shopMenu.length < 3) {
      menus = shopMenu;
    } else {
      menus = shopMenu.slice(0, 3);
    }
    content = (
      <div className="shop_menu_image">
        {menus.map((menu: Menu) => (
          <img src={menu.image_url} alt="shop_menu_image" />
        ))}
      </div>
    );
  } else if (isError) {
    content = <>{error.toString()}</>;
  }

  return <div>{content}</div>;
}
