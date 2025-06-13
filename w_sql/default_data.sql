INSERT INTO product
	( reference, product_name, current_price, unit, description, image_url) VALUES
    ( 'GC0001', 'Poudre de fée', 150, 'unité', 'Poudre magique, guérisseur, médiévale, elfique', 'https://i.ibb.co/HfdM4X8P/image7.png' ),
    ( 'GC0002', 'Chemise mithril', 100, 'unité', 'Armure légère mais incroyablement résistante', 'https://i.ibb.co/gFFdxnTg/image3.png' ),
    ( 'GC0003', 'Anneau invisibilité', 200, 'unité', 'Devenez invisible à volonté', 'https://i.ibb.co/fYvHjqLr/image8.png' );

INSERT INTO product_stock
	( id_product, quantity_flow, date_flow) VALUES
    ( 1, 20, '2025-06-06' ),
    ( 2, 30, '2025-06-06' ),
    ( 3, 40, '2025-06-06' );

INSERT INTO stock_inventory
	( id_product, quantity_inventory, date_inventory) VALUES
    ( 4, 100, '2025-06-05' );



INSERT INTO product
	( reference, product_name, current_price, unit, description, image_url) VALUES
    ( 'GC0001', 'Poudre de fée', 30, 'unité', 'Poudre magique, guérisseur, médiévale, elfique', 'https://img.freepik.com/photos-gratuite/gros-plan-ara-ecarlate-partir-vue-cote-tete-agrandi_488145-3540.jpg?semt=ais_hybrid&w=740' ),
    ( 'GC0002', 'Horloge', 100, 'unité', 'Cet artefact nain marque l''écoulement du temps avec une précision millénaire. Son mécanisme en mithril pur résonne avec les pulsations magiques de la terre, indiquant même les phases lunaires des royaumes elfiques', 'https://img.freepik.com/photos-gratuite/gros-plan-ara-ecarlate-partir-vue-cote-tete-agrandi_488145-3540.jpg?semt=ais_hybrid&w=740' ),
    ( 'GC0003', 'Lampe', 150, 'unité', 'Forgée par les nains de Khazad-dûm, cette lanterne contient une lueur éternelle capturée dans un cristal de Moria. Elle s''illumine à la voix en khuzdul et repousse les ombres des créatures de l''Abîme.', 'https://img.freepik.com/photos-gratuite/gros-plan-ara-ecarlate-partir-vue-cote-tete-agrandi_488145-3540.jpg?semt=ais_hybrid&w=740' ),
    ( 'GC0004', 'Chemise mithril', 250, 'unité', 'Armure légère mais incroyablement résistante', 'https://img.freepik.com/photos-gratuite/gros-plan-ara-ecarlate-partir-vue-cote-tete-agrandi_488145-3540.jpg?semt=ais_hybrid&w=740' ),
    ( 'GC0005', 'Anneau invisibilité', 75, 'unité', 'Devenez invisible à volonté', 'https://img.freepik.com/photos-gratuite/gros-plan-ara-ecarlate-partir-vue-cote-tete-agrandi_488145-3540.jpg?semt=ais_hybrid&w=740' );

INSERT INTO product_stock
	( id_product, quantity_flow, date_flow) VALUES
    ( 1, 20, '2025-06-06' ),
    ( 2, 30, '2025-06-06' ),
    ( 3, 40, '2025-06-06' ),
    ( 4, -50, '2025-06-06' ),
    ( 5, 70, '2025-06-06' ),
    ( 5, -10, '2025-06-06' );

