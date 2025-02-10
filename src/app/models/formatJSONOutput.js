const cleanNestedField = (obj, keys, depth = 0) => {
    if (depth === keys.length - 1) {
      delete obj[keys[depth]];
      return;
    }
    cleanNestedField(obj[keys[depth]], keys, depth + 1);
  };
  
  const formatJSONOutput = (schema) => {
    schema.set("toJSON", {
      transform: (document, returnedObject) => {
        Object.keys(schema.paths).forEach((field) => {
          if (schema.paths[field].options?.private) {
            cleanNestedField(returnedObject, field.split("."), 0);
          }
        });
  
        if (returnedObject._id) {
          returnedObject.id = returnedObject._id.toString();
        }
        delete returnedObject._id;
        delete returnedObject.__v;
      },
    });
  };
  
  module.exports = formatJSONOutput;
  