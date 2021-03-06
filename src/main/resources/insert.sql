INSERT INTO passport(passport_id, full_name, series, number)
values (0, 'Олег Иванович Самарин', '3245', '124678'),
       (1, 'Иван Николаевич Белов', '6542', '6431234'),
       (2, 'Денис Сергеевич Иванов', '1253', '4564231'),
       (3, 'Николай Степанович Сидоров', '7632', '3464243'),
       (4, 'Виктор Петрович Беглов', '4235', '3464243'),
       (5, 'Дмитрий Олегович Старых', '7656', '3462342'),
       (6, 'Валерий Дмитрович Молодых', '9864', '2364123'),
       (7, 'Сергей Александрович Петров', '8562', '8865875');

INSERT INTO advertiser(advertiser_id, passport_id, mail, phone, checking_account, inn)
values (0, 0, 'shine@mail.com', 79555353598, '124S678', '123312412312341'),
       (1, 1, 'mickey@mail.com', 79463432442, '6431234', '354342423242312'),
       (2, 2, 'mouse@mail.com', 79876655643, '4564231', '567323412367442'),
       (3, 3, 'superman@mail.com', 79553421234, '3464243', '865212343653413'),
       (4, 4, 'java@mail.com', 79653442341, '7865675', '523412238864232');

INSERT INTO seller(seller_id, passport_id, mail, phone)
values (0, 5, 'google@mail.com', 79785666745),
       (1, 6, 'yandex@mail.com', 79463546566),
       (2, 7, 'yahoo@mail.com', 7987623453);

INSERT INTO ad(ad_id, ad_name, price, duration)
values (0, 'Баннер', 2500000.0, 30),
       (1, 'Графити', 100000.0, 90),
       (2, 'Интернет', 500000.0, 90),
       (3, 'Телевизор', 1200000.0, 180);

INSERT INTO "check"(check_id, price, nds, tax)
values (0, 5000000.0, 13, 1),
       (1, 1000000.0, 13, 3),
       (2, 6000000.0, 21, 2),
       (3, 100000.0, 13, 1),
       (4, 12000000.0, 13, 1),
       (5, 1800000.0, 21, 1);

INSERT INTO contract(contract_id, advertiser_id, ad_id, seller_id, check_id)
values (0, 0, 0, 0, 0),
       (1, 1, 3, 1, 1),
       (2, 2, 2, 2, 2),
       (3, 3, 3, 0, 3),
       (4, 4, 1, 1, 4),
       (5, 2, 0, 2, 5);

INSERT INTO user_role(user_role_id, role_name)
values (0, 'USER'),
       (1, 'ADMIN');
