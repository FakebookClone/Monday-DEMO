UPDATE friends
SET first_name = $1, last_name = $2
WHERE friend_id = $3;
