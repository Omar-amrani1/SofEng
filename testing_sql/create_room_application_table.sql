CREATE TABLE `hss_smart_rentals`.`room_application` (
  `room_id` INT NOT NULL,
  `property_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`room_id`, `property_id`));
