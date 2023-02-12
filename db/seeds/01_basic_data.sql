
-- Insert Users
INSERT INTO users(username, email, password) VALUES('Username 1', 'tristanjacobs@gmail.com', '$2a$12$XGQhw7cnT2ZXd4oq7tBwSuqyUkXIy1TEFGnN/Ij.YQK6R1GI354WW');
INSERT INTO users(username, email, password) VALUES('Username 2', 'allisonjackson@mail.com', '$2a$12$XGQhw7cnT2ZXd4oq7tBwSuqyUkXIy1TEFGnN/Ij.YQK6R1GI354WW');
INSERT INTO users(username, email, password) VALUES('Username 3', 'asherpoole@gmx.com', '$2a$12$XGQhw7cnT2ZXd4oq7tBwSuqyUkXIy1TEFGnN/Ij.YQK6R1GI354WW');
INSERT INTO users(username, email, password) VALUES('Username 4', 'michaelgray@mail.com', '$2a$12$XGQhw7cnT2ZXd4oq7tBwSuqyUkXIy1TEFGnN/Ij.YQK6R1GI354WW');
INSERT INTO users(username, email, password) VALUES('Username 5', 'ariaatkinson@outlook.com', '$2a$12$XGQhw7cnT2ZXd4oq7tBwSuqyUkXIy1TEFGnN/Ij.YQK6R1GI354WW');

-- Insert Organizations
INSERT INTO organizations(owner_id, org_name) VALUES(1, 'Username 1s Org 1');
INSERT INTO organizations(owner_id, org_name) VALUES(1, 'Username 1s Org 2');
INSERT INTO organizations(owner_id, org_name) VALUES(2, 'Username 2s Org');

-- Tags
INSERT INTO tags(name) VALUES('Finance');
INSERT INTO tags(name) VALUES('Gaming');
INSERT INTO tags(name) VALUES('Entertainment');
INSERT INTO tags(name) VALUES('Social');

-- User Passwords
INSERT INTO user_passwords(website_name, username, password, user_id, tag_id) VALUES('user website 1', 'user username 1', 'test-password', 1, 1);
INSERT INTO user_passwords(website_name, username, password, user_id, tag_id) VALUES('user website 1', 'user username 1', 'test-password2', 1, 1);

-- Org Passwords
INSERT INTO organization_passwords(website_name, username, password, organization_id, tag_id) VALUES('org website 1', 'org username 1', 'org-test-password', 1, 3);
INSERT INTO organization_passwords(website_name, username, password, organization_id, tag_id) VALUES('org website 1', 'org username 1', 'org-test-password2', 1, 3);

-- Invites
INSERT INTO invites(user_id, organization_id) VALUES(4, 1);
