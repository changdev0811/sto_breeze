# README

## Setup

- Run `bundle install`

## Database

- On first use, and after pulls, it's necessary to migrate the database

- On first use, run `rake db:setup` to create empty database files

- Run `rake db:migrate` to run all pending migrations

## Clearing data

- To make it easier to clear out the database files and remove any 'uploaded'
  files created in `public/uploads` by carrierwave, run `rake data:clear`
