CREATE SCHEMA IF NOT EXISTS marketplace_goods;

use marketplace_goods;

CREATE TABLE IF NOT EXISTS seller_table
(
	id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
	PRIMARY KEY(id),
    
	created_timestamp   TIMESTAMP   DEFAULT NOW() NOT NULL,
	created_user_id	BIGINT UNSIGNED NOT NULL,
	updated_timestamp   TIMESTAMP  DEFAULT CURRENT_TIMESTAMP	NOT NULL,
	updated_user_id	BIGINT UNSIGNED NOT NULL,
	start_timestamp TIMESTAMP DEFAULT NOW() NOT NULL,
	end_timestamp TIMESTAMP DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS shop_table (
	id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT "PK: shop_id",
	manager_seller_id BIGINT UNSIGNED NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(manager_seller_id) REFERENCES seller_table(id),

	
    created_timestamp   TIMESTAMP   DEFAULT NOW() NOT NULL,
    created_user_id	BIGINT UNSIGNED NOT NULL,
    updated_timestamp   TIMESTAMP  DEFAULT CURRENT_TIMESTAMP	NOT NULL,
    updated_user_id	BIGINT UNSIGNED NOT NULL,
    start_timestamp TIMESTAMP DEFAULT NOW() NOT NULL,
    end_timestamp TIMESTAMP DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS shop_ml_table
(
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT "PK: shop_ml_id",
    shop_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL, 
    is_title_approved BOOL DEFAULT FALSE,
    lang_code VARCHAR(7) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (shop_id) REFERENCES shop_table(id),

    created_timestamp   TIMESTAMP   DEFAULT NOW() NOT NULL,
    created_user_id	BIGINT UNSIGNED NOT NULL,
    updated_timestamp   TIMESTAMP  DEFAULT CURRENT_TIMESTAMP	NOT NULL,
    updated_user_id	BIGINT UNSIGNED NOT NULL,
    start_timestamp TIMESTAMP DEFAULT NOW() NOT NULL,
    end_timestamp TIMESTAMP DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS buyer_table  (
	id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT "PK:buyer_id",
    profile_id BIGINT UNSIGNED NOT NULL,

    created_timestamp   TIMESTAMP   DEFAULT NOW() NOT NULL,
    created_user_id	BIGINT UNSIGNED NOT NULL,
    updated_timestamp   TIMESTAMP  DEFAULT CURRENT_TIMESTAMP	NOT NULL,
    updated_user_id	BIGINT UNSIGNED NOT NULL,
    start_timestamp TIMESTAMP DEFAULT NOW() NOT NULL,
    end_timestamp TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(profile_id) REFERENCES profile.profile_table(id)

);

CREATE TABLE IF NOT EXISTS buyer_ml_table
(
	  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT "PK: buyer_ml_id",
    buyer_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL, 
    is_title_approved BOOL DEFAULT FALSE,
    lang_code VARCHAR(7) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (buyer_id) REFERENCES buyer_table(id),

    created_timestamp   TIMESTAMP   DEFAULT NOW() NOT NULL,
    created_user_id	BIGINT UNSIGNED NOT NULL,
    updated_timestamp   TIMESTAMP  DEFAULT CURRENT_TIMESTAMP	NOT NULL,
    updated_user_id	BIGINT UNSIGNED NOT NULL,
    start_timestamp TIMESTAMP DEFAULT NOW() NOT NULL,
    end_timestamp TIMESTAMP DEFAULT NULL
);


CREATE TABLE IF NOT EXISTS product_table (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT "PK: product_id",
    group_list_id INT UNSIGNED NOT NULL,

    PRIMARY KEY(id),
    FOREIGN KEY (group_list_id) REFERENCES group.group_list_table(id),

    created_timestamp TIMESTAMP   DEFAULT NOW() NOT NULL,
    created_user_id	BIGINT UNSIGNED NOT NULL,
    updated_timestamp TIMESTAMP  DEFAULT CURRENT_TIMESTAMP	NOT NULL,
    updated_user_id	BIGINT UNSIGNED NOT NULL,
    start_timestamp TIMESTAMP DEFAULT NOW() NOT NULL,
    end_timestamp TIMESTAMP DEFAULT NULL
);



CREATE TABLE IF NOT EXISTS product_deal_table
(
	id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
	shop_id BIGINT UNSIGNED NOT NULL,
	product_id BIGINT UNSIGNED NOT NULL,

  regular_price FLOAT(10,2) UNSIGNED NOT NULL,
	quantity INT UNSIGNED NULL, -- as in some case can produce the product as much as needed
	allow_more_than_quantity_in_the_same_price BOOL,

	discount_percentage INT UNSIGNED,
	discount FLOAT(10,2) UNSIGNED NOT NULL,
	discounted_price FLOAT(10,2) UNSIGNED NOT NULL,
	discounted_price_usd FLOAT(10,2) UNSIGNED NOT NULL,
	
	currency_id SMALLINT UNSIGNED NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(shop_id) REFERENCES shop_table(id),
	FOREIGN KEY(product_id) REFERENCES product_table(id),
	FOREIGN KEY(currency_id) REFERENCES currency.currency_table(id),

	created_timestamp   TIMESTAMP   DEFAULT NOW() NOT NULL,
	created_user_id	BIGINT UNSIGNED NOT NULL,
	updated_timestamp   TIMESTAMP  DEFAULT CURRENT_TIMESTAMP	NOT NULL,
	updated_user_id	BIGINT UNSIGNED NOT NULL,
	start_timestamp TIMESTAMP DEFAULT NOW() NOT NULL,
	end_timestamp TIMESTAMP DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS product_deal_ml_table
(
	id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    product_deal_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL, 
    is_title_approved BOOL DEFAULT FALSE,
    lang_code VARCHAR(7) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (product_deal_id) REFERENCES product_deal_table(id),

    created_timestamp   TIMESTAMP   DEFAULT NOW() NOT NULL,
    created_user_id	BIGINT UNSIGNED NOT NULL,
    updated_timestamp   TIMESTAMP  DEFAULT CURRENT_TIMESTAMP	NOT NULL,
    updated_user_id	BIGINT UNSIGNED NOT NULL,
    start_timestamp TIMESTAMP DEFAULT NOW() NOT NULL,
    end_timestamp TIMESTAMP DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS order_table 
(
    id BIGINT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT COMMENT "PK: order_id",
    shop_id BIGINT UNSIGNED NOT NULL,
	buyer_id BIGINT UNSIGNED NOT NULL,
    product_deal_id BIGINT UNSIGNED NOT NULL,
    price FLOAT(10,2) UNSIGNED NOT NULL,
    shipment_location_id BIGINT UNSIGNED NOT NULL NULL,
    pickup_location_id BIGINT UNSIGNED NOT NULL NULL,
    
    order_time TIMESTAMP NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(shop_id) REFERENCES shop_table(id),
    FOREIGN KEY(buyer_id) REFERENCES buyer_table(id),
	FOREIGN KEY(product_deal_id) REFERENCES product_deal_table(id),
    FOREIGN KEY(shipment_location_id) REFERENCES location.location_table(id),
    FOREIGN KEY(pickup_location_id) REFERENCES location.location_table(id),

    created_timestamp   TIMESTAMP   DEFAULT NOW() NOT NULL,
    created_user_id	BIGINT UNSIGNED NOT NULL,
    updated_timestamp   TIMESTAMP  DEFAULT CURRENT_TIMESTAMP	NOT NULL,
    updated_user_id	BIGINT UNSIGNED NOT NULL,
    start_timestamp TIMESTAMP DEFAULT NOW() NOT NULL,
    end_timestamp TIMESTAMP DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS review_table 
(
    id BIGINT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT COMMENT "PK:review_id",
    order_id BIGINT UNSIGNED NOT NULL,
    rate INT UNSIGNED NOT NULL,  -- 1..10 
    PRIMARY KEY(id),
    FOREIGN KEY(order_id) REFERENCES order_table(id),

    created_timestamp   TIMESTAMP   DEFAULT NOW() NOT NULL,
    created_user_id	BIGINT UNSIGNED NOT NULL,
    updated_timestamp   TIMESTAMP  DEFAULT CURRENT_TIMESTAMP	NOT NULL,
    updated_user_id	BIGINT UNSIGNED NOT NULL,
    start_timestamp TIMESTAMP DEFAULT NOW() NOT NULL,
    end_timestamp TIMESTAMP DEFAULT NULL
);



CREATE TABLE IF NOT EXISTS review_ml_table
(
	id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT "PK:review_ml_id",
    review_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL, 
    is_title_approved BOOL DEFAULT FALSE,
    lang_code VARCHAR(7) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (review_id) REFERENCES review_table(id),

    created_timestamp   TIMESTAMP   DEFAULT NOW() NOT NULL,
    created_user_id	BIGINT UNSIGNED NOT NULL,
    updated_timestamp   TIMESTAMP  DEFAULT CURRENT_TIMESTAMP	NOT NULL,
    updated_user_id	BIGINT UNSIGNED NOT NULL,
    start_timestamp TIMESTAMP DEFAULT NOW() NOT NULL,
    end_timestamp TIMESTAMP DEFAULT NULL
);


CREATE TABLE IF NOT EXISTS shopping_cart_table
(
	id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
	buyer_id BIGINT UNSIGNED NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(buyer_id) REFERENCES buyer_table(id),

	created_timestamp   TIMESTAMP   DEFAULT NOW() NOT NULL,
	created_user_id	BIGINT UNSIGNED NOT NULL,
	updated_timestamp   TIMESTAMP  DEFAULT CURRENT_TIMESTAMP	NOT NULL,
	updated_user_id	BIGINT UNSIGNED NOT NULL,
	start_timestamp TIMESTAMP DEFAULT NOW() NOT NULL,
	end_timestamp TIMESTAMP DEFAULT NULL
);

-- this table assign shopping cart to the deals their buyer choose (many to many)
CREATE TABLE IF NOT EXISTS shopping_cart_chosen_product_deal_table 
(
	id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
	shopping_cart_id BIGINT UNSIGNED NOT NULL,
	product_deal_id BIGINT UNSIGNED NOT NULL,
	quantity INT UNSIGNED NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(shopping_cart_id) REFERENCES shopping_cart_table(id),
	FOREIGN KEY(product_deal_id) REFERENCES product_deal_table(id),

	created_timestamp   TIMESTAMP   DEFAULT NOW() NOT NULL,
	created_user_id	BIGINT UNSIGNED NOT NULL,
	updated_timestamp   TIMESTAMP  DEFAULT CURRENT_TIMESTAMP	NOT NULL,
	updated_user_id	BIGINT UNSIGNED NOT NULL,
	start_timestamp TIMESTAMP DEFAULT NOW() NOT NULL,
	end_timestamp TIMESTAMP DEFAULT NULL
)

