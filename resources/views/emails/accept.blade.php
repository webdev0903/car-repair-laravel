<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Your Car Has Checked In</title>
</head>
<body bgcolor="#f7f7f7">
<p>Dear {{$data->customer}}</p>
<p>Your car, {{$data->make}} {{$data->model}} {{$data->year}}, {{$data->trim}} has been checked in. You can view details of your car repair and maintenance by <a href="{{$url}}" target="_blank">clicking here</a>.</p>
<p>Once your car is ready, we will send you a 100-point digital report, where you can view in detail the condition of the car and approve recommended services.
</p>
<p>Regards,</p>
<p>Gargash Autobody</p>
</body>
</html>