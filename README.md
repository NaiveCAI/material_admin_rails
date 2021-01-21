# MaterialAdmin
Use rails webpacker to bundle the material admin template.

https://wrappixel.com/demos/admin-templates/materialpro-bootstrap-latest/material-pro/src/material/ui-scrollspy.html#list-item-2

Easily install and set up admin quickly

## Prerequisite
- Need set up your db first


## Usage
### Installation
Add this line to your application's Gemfile:

```ruby
gem 'rails_material_admin'
```

And then execute:
```bash
$ bundle
```

### Init an admin template
```
rails generate material_admin [layout_name]
```

### Init a simple users CRUD template
```
rails generate crud user --options layout_name:[layout_name]
```


## Contributing
Contribution directions go here.

## License
The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
