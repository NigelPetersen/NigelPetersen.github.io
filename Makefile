
moby-data:
	docker-compose -f services/docker-compose.yml up

moby-connect: 
	psql -h localhost -p 5436 -U postgres