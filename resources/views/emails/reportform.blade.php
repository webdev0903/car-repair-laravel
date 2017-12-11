<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Your 100 Point Digital Car Report is Ready!</title>
</head>
<body bgcolor="#f7f7f7">
<p>Dear {{$data->customer}}</p>
<p>Your digital report is now ready for {{$data->make}} {{$data->model}} {{$data->year}}, {{$data->trim}}. You can view details by <a href="{{$url}}" target="_blank">clicking here</a>.</p>
<p>For approving recommended services, please select the services and confirm through start repair. Your service advisor will call you shortly to confirm the final costs and time required.
</p>
<p>Best Regards,</p>
<p>Gargash Autobody</p>
</body>
</html>