export const middleware = (schema, property) => {
    return (req, res, next) => {
      const validation = schema.validate(req.body, { abortEarly: false });
  
      if (validation.error) {
        console.log(validation.error.details);
        res.sendStatus(422);
        return;
      }
      next();
    }
}