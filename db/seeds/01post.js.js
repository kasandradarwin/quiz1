/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const faker = require('faker');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("posts")
    .del()
    .then(function() {

      const posts = Array.from({length: 25}).map(() => {
        return {
          username:faker.internet.userName(),
          image_url: faker.image.imageUrl(),
          content: faker.lorem.paragraph(),
          created_at: faker.date.past()
        }
      })
      return knex('posts').insert(posts)
    })
};