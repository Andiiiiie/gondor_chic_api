CREATE  TABLE product (
	id                   serial  NOT NULL  ,
	reference            varchar  NOT NULL  ,
	product_name         varchar  NOT NULL  ,
	current_price        double precision  NOT NULL  ,
	unit                 varchar  NOT NULL  ,
	description          varchar  NOT NULL  ,
	image_url            varchar  NOT NULL  ,
	CONSTRAINT pk_product PRIMARY KEY ( id )
 );

CREATE  TABLE product_stock (
	id                   serial  NOT NULL  ,
	id_product           integer  NOT NULL  ,
	quantity_flow        double precision  NOT NULL  ,
	date_flow            timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	CONSTRAINT pk_product_stock PRIMARY KEY ( id ),
	CONSTRAINT fk_product_stock_product FOREIGN KEY ( id_product ) REFERENCES product( id )
 );

CREATE  TABLE stock_inventory (
	id                   serial  NOT NULL  ,
	id_product           integer  NOT NULL  ,
	quantity_inventory   double precision  NOT NULL  ,
	date_inventory       timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	CONSTRAINT pk_stock_inventory PRIMARY KEY ( id ),
	CONSTRAINT fk_stock_inventory_product FOREIGN KEY ( id_product ) REFERENCES product( id )
 );

CREATE  TABLE "user" (
	id                   serial  NOT NULL  ,
	phone_number         varchar  NOT NULL  ,
	name                 varchar  NOT NULL  ,
	username             varchar    ,
	pseudo               varchar  NOT NULL  ,
	hash_password        varchar  NOT NULL  ,
	CONSTRAINT pk_client PRIMARY KEY ( id )
 );
