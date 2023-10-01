USE marketplace_goods;


INSERT INTO seller_table()
 VALUES
 (),(),();
 
INSERT INTO shop_table (manager_id)
 VALUES
 (1), (1), (1);

INSERT INTO shop_ml_table (shop_id, title, is_title_approved, lang_code) 
VALUES
 (2, "Shop 1 Title", true, "en"), (2, "Shop 2 Title", true, "en"),
 (2, "חנות 3 כותרת", true, "he");


INSERT INTO buyer_table (profile_id)
 VALUES
 (1), (2), (3);


INSERT INTO buyer_ml_table (buyer_id, title, is_title_approved, lang_code) 
VALUES
(1, "buyer 1 Title", true, "en"), (2, "buyer 2 Title", true, "en"),
(3, "buyer 3 Title", true, "en");



INSERT INTO product_table (group_list_id)
 VALUES
 (1), (1), (1);


INSERT INTO product_deal_table (shop_id, product_id, quantity, allow_more_than_quantity_in_the_same_price, regular_price, discount, discounted_price, currency_id)
 VALUES
(2, 1, 10, true, 100, 20, 80, 1), (2, 2, 20, false, 50, 10, 45, 1), (3, 3, 30, true, 200, 40, 120, 1);

INSERT INTO product_deal_ml_table (product_deal_id, title, is_title_approved, lang_code)
 VALUES
 (4, "Basket ball nike size 7", true, "en"), (2, "Intreserf surfboard for begginers in a special price", true, "en"),
 (4, "כדורסל מקצועי של נייק מידה 7", true, "en");


INSERT INTO order_table (shop_id, buyer_id, product_deal_id, price, shipment_location_id,
                        pickup_location_id, order_time) 
VALUES
 (4, 4, 4, 80, 1,1, NOW()), (4, 4, 4, 45,1, 1, NOW()), (3, 1, 1, 120,1, 1, NOW());

