# Poser
_totally posing as your DB_


### Instructions
1. run `(sudo) npm install`
2. install mongodb (homebrew is easiest) `brew install mongodb && mongod`
3. Run mongo `mongo`. If you run into trouble because dbpath isn't set that with a flag.  Here are there docs: http://docs.mongodb.org/manual/tutorial/manage-mongodb-processes/
4. Once mongo is running import the data from state_counts.js 
```
mongoimport --db calendar --collection state_counts --jsonArray state_counts.js
```

- build with node -v 0.12.0

...
