json.description data['weather'][0]['description']
json.icon data['weather'][0]['icon']
json.temp_min data['main']['temp_min']
json.temp_max data['main']['temp_max']
json.wind_speed data['wind']['speed']
json.date DateTime.strptime(data['dt'].to_s,'%s')
