<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Appointment Booked</title>
</head>
<body bgcolor="#f7f7f7">
<p>Dear {{$data->name}}</p>
<p>Thank you for booking an appointment with Gargash Autobody on {{date('d-m-Y', strtotime($data->date)).' at '.date('H:i A', strtotime($data->date.' '.$data->times[0]))}}.</p>
<p>We look forward to welcoming you to a new automotive experience!
</p>
<p>Regards,</p>
<p>Gargash Autobody</p>
</body>
</html>