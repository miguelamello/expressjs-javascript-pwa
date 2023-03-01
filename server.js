const express = require('express');
const compression = require('compression');
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static('../dist'));

// Only compress text-based files
app.use(compression({
  filter: function (req, res) {
    return (/json|text|javascript|css|html/).test(res.getHeader('Content-Type'));
  }
}));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});