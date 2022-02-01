FROM python:3.9.9

ENV PYTHONUNBUFFERED 1

RUN mkdir /benford-backend

WORKDIR /benford-backend

ADD . /benford-backend

COPY ./requirements.txt ./

RUN pip install -r requirements.txt

EXPOSE 8000
