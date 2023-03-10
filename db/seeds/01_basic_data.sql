
-- Insert Users
INSERT INTO users(email, password) VALUES('tristanjacobs@gmail.com', '$2a$12$XGQhw7cnT2ZXd4oq7tBwSuqyUkXIy1TEFGnN/Ij.YQK6R1GI354WW');
INSERT INTO users(email, password) VALUES('allisonjackson@mail.com', '$2a$12$XGQhw7cnT2ZXd4oq7tBwSuqyUkXIy1TEFGnN/Ij.YQK6R1GI354WW');
INSERT INTO users(email, password) VALUES('asherpoole@gmx.com', '$2a$12$XGQhw7cnT2ZXd4oq7tBwSuqyUkXIy1TEFGnN/Ij.YQK6R1GI354WW');
INSERT INTO users(email, password) VALUES('michaelgray@mail.com', '$2a$12$XGQhw7cnT2ZXd4oq7tBwSuqyUkXIy1TEFGnN/Ij.YQK6R1GI354WW');
INSERT INTO users(email, password) VALUES('ariaatkinson@outlook.com', '$2a$12$XGQhw7cnT2ZXd4oq7tBwSuqyUkXIy1TEFGnN/Ij.YQK6R1GI354WW');

-- Insert Organizations
INSERT INTO organizations(owner_id, org_name) VALUES(1, 'Username 1s Org 1');
INSERT INTO organizations(owner_id, org_name) VALUES(1, 'Username 1s Org 2');
INSERT INTO organizations(owner_id, org_name) VALUES(2, 'Username 2s Org');

-- Tags
INSERT INTO organization_password_tags(name, organization_id) VALUES('Finance', 1);
INSERT INTO organization_password_tags(name, organization_id) VALUES('Gaming', 1);
INSERT INTO organization_password_tags(name, organization_id) VALUES('Entertainment', 1);
INSERT INTO organization_password_tags(name, organization_id) VALUES('Social', 1);

INSERT INTO user_password_tags(name, user_id) VALUES('Finance', 2);
INSERT INTO user_password_tags(name, user_id) VALUES('Gaming', 2);

-- Insert some users into Organization 1
INSERT INTO users_organizations(user_id, organization_id) VALUES(1, 1);
INSERT INTO users_organizations(user_id, organization_id) VALUES(2, 1);
INSERT INTO users_organizations(user_id, organization_id) VALUES(3, 1);

-- User Passwords
INSERT INTO user_passwords(website_name, username, password, user_id, tag_id) VALUES('user website 1', 'user username 1', 'test-password', 1, 1);
INSERT INTO user_passwords(website_name, username, password, user_id, tag_id) VALUES('user website 1', 'user username 1', 'test-password2', 1, 1);

-- Org Passwords
INSERT INTO organization_passwords(website_name, username, password, organization_id, tag_id) VALUES('org website 1', 'org username 1', 'org-test-password', 1, 1);
INSERT INTO organization_passwords(website_name, username, password, organization_id, tag_id) VALUES('org website 1', 'org username 1', 'org-test-password2', 1, 2);

-- Invites
INSERT INTO invites(user_id, organization_id) VALUES(4, 1);
