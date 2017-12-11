<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Customer has Approved Recommendations</title>
</head>
<body bgcolor="#f7f7f7">
<p>Customer Email: {{$data->email}}</p>
<p>Car: {{$data->make}} {{$data->model}} {{$data->year}}, {{$data->trim}}</p>
<p>Report info#{{$id}} has updated by customer.</p>
</body>
</html>