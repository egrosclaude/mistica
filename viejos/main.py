#-*- coding: utf-8 -*-
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import sessionmaker
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship, backref
from kivy.graphics import Rectangle
from kivy.uix.gridlayout import GridLayout
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label
from kivy.uix.widget import Widget
from kivy.app import App
import os.path


# Database connection
DATABASE = 'sqlite:///mistica.db'
DEBUG = True

# ORM base
Base = declarative_base()

# ORM types
class Insumo(Base):
    __tablename__ = 'insumos'

    iid = Column(Integer, primary_key=True)
    descr = Column(String, nullable=False,unique=True,index=True)
    cost = Column(Float, nullable=True)
    cant = Column(Float, nullable=True)
    unid = Column(String, nullable=True)

    def __init__(self, descr, cost, cant, unid):
      self.descr = descr
      self.cost = cost
      self.cant = cant
      self.unid = unid

    def __repr__(self):
        return "<Record('%s = %f')>" % (self.descr, self.cost)

# Connect to database
engine = create_engine(DATABASE, echo=DEBUG)
session_factory = sessionmaker(bind=engine)

# Initialize database if it doesn't exist
if not os.path.exists('mistica.db'):
  Base.metadata.create_all(engine)

# Create a bunch of records if we don't have any
#if session.query(Insumo).count() == 0:
#  for i in range(10):
#    record = Insumo('key%d' % i,  i / 10)
#    session.add(record)
#    session.commit()

class CloudWidget(GridLayout):
   def __init__(self,cloud,**kwargs):
	self.cols=2
	super(CloudWidget,self).__init__(**kwargs)
	for i in cloud.items():
		tb = ToggleButton(text=i[0],state=i[1])
		self.add_widget(tb)


# Kivy widget for a 'Insumo' type
#class InsumoWidget(GridLayout):
#  def __init__(self, record, **kwargs):
#    self.cols = 2
#    super(InsumoWidget, self).__init__(**kwargs)
#    self.add_widget(Label(text=record.descr))
#    self.add_widget(Label(text='%.2f' % record.cost))
# App loads all records and puts them into a ui
#class InsumoABM(App):
#  def build(self):
#    layout = BoxLayout(orientation='vertical')
#    records = session.query(Insumo).all()
#    for r in records:
#      widget = InsumoWidget(r)
#      layout.add_widget(widget)
#    return layout
#
#if __name__ == '__main__':
#InsumoABM().run()
#-------------------------------------------------------------------------------
from kivy.app import App
from kivy.uix.gridlayout import GridLayout
from kivy.uix.label import Label
from kivy.uix.textinput import TextInput
from kivy.uix.widget import Widget
from kivy.uix.button import Button
from kivy.uix.boxlayout import BoxLayout
from kivy.properties import ListProperty

# python main.py --size=480x800 is better
#from kivy.core.window import Window
#Window.size = (480, 800)

from kivy.lang import Builder
from kivy.uix.screenmanager import ScreenManager,Screen

Builder.load_string("""
<MenuScreen>:
	BoxLayout: 
		orientation: 'vertical'
		Button:
			text: 'Insumos'
			on_press: 
				root.manager.transition.direction = 'left'
				root.manager.current = 'insumos'
		Button:
			text: 'Productos'
			on_press: 
				root.manager.transition.direction = 'left'
				root.manager.current = 'productos'
		Button:
			text: 'Fin'
			on_press:
				app.stop()
<InsumosListado>:
	BoxLayout:
		orientation: 'vertical'
		on_size: app.listarInsumos(self)
		Button:
			text: 'Volver'
			on_press: 
				root.manager.transition.direction = 'right'
				root.manager.current = 'insumos'

<InsumosScreen>:
	id: InsumosScreen
	BoxLayout:
		id: bl
		orientation: 'vertical'
		popup: popup.__self__
		BoxLayout:
			height: '32dp'
			size_hint_y: None
			Button:
				text: '<'
				size_hint_x: None
				width: self.height
			Button:
				text: 'Nuevo'
				on_press: 
					descr.text = ""
					cost.text = ""
					cant.text = ""
					unid.text = ""
			Button:
				text: 'Listar'
				on_press:
					root.manager.transition.direction = 'left'
					root.manager.current = 'insumos_listado'
			Button:
				text: '>'
				size_hint_x: None
				width: self.height
		GridLayout:
			height: '96dp'
			size_hint_y: None
			cols: 2
			Label:
				text: 'Descripción'
			TextInput:
				id: descr
				multiline: False
			Label:
				text: 'Costo unitario'
			TextInput:
				id: cost
				multiline: False
			Label:
				text: 'Unidades'
				size_hint_x: '0.5'
			BoxLayout:
				TextInput:
					id: cant
					multiline: False
				Spinner:
					id: unid
					text: ""
					values: "u","ml","L","cc","g","Kg"
					size_hint: (None, None)
					size: (40,32)
					
		BoxLayout:
		BoxLayout:
			height: '32dp'
			size_hint_y: None
			Button:
				text: 'Guardar'
				on_press:
					x = app.addInsumo(descr.text, cost.text,cant.text, unid.text)
					if x == -1: bl.popup.open()
			Button:
				text: 'Volver'
				on_press: 
					root.manager.transition.direction = 'right'
					root.manager.current = 'menu'


		Popup:
			id: popup
			on_parent: if self.parent == bl: bl.remove_widget(self)
			title: 'Error'
			content: popupcontent
			Button:
				id: popupcontent
				size_hint_y: None
				valign: 'middle'
				text: "El artículo ya existe"
				on_release: popup.dismiss()


<ProductosScreen>:
	BoxLayout:
		orientation: 'vertical'
		BoxLayout:
			height: '32dp'
			size_hint_y: None
			Button:
				text: '<'
				size_hint_x: None
				width: self.height
			Button:
				text: 'Nuevo'
			Button:
				text: 'Listar'
			Button:
				text: '>'
				size_hint_x: None
				width: self.height
		GridLayout:
			height: '32dp'
			size_hint_y: None
			cols: 2
			Label:
				text: 'Descripción'
			TextInput:
				id: descr
				multiline: False
			Label:
				text: 'Precio de venta'
			TextInput:
				id: pvta 
				multiline: False
		BoxLayout:
			# #:import cw CloudWidget
			# #cw(app.InsumosCloud):
		BoxLayout:
			height: '32dp'
			size_hint_y: None
			Button:
				text: 'Guardar'
				on_press:
					app.addProducto(descr.text, pvta.text)
			Button:
				text: 'Volver'
				on_press: 
					root.manager.transition.direction = 'right'
					root.manager.current = 'menu'

""")

class MenuScreen(Screen):
	pass

class InsumosListado(Screen):
	pass

class InsumosScreen(Screen):
	pass

class ProductosScreen(Screen):
	pass



class Mistica(App):

    InsumosCloud = {'Depresión':1, 'Papada':0}

    def build(self):
	# Connect to database
	sm = ScreenManager()
	sm.add_widget(MenuScreen(name='menu'))
	sm.add_widget(InsumosScreen(name='insumos'))
	sm.add_widget(InsumosListado(name='insumos_listado'))
	sm.add_widget(ProductosScreen(name='productos'))
	self.session = session_factory()
        return sm

    def addInsumo(self, descr, cost, cant, unid):
	try:
		self.session.add(Insumo(descr,cost,cant,unid))
		self.session.commit()
		return 0
	except: 
		self.session.rollback()
		return -1
	

    def listarInsumos(self,layout):
	class InsumoWidget(GridLayout):
		def __init__(self, record, **kwargs):
			self.cols = 2
			super(InsumoWidget, self).__init__(**kwargs)
			self.add_widget(Label(text=record.descr))
			self.add_widget(Label(text='%.2f' % record.cost))

	records = self.session.query(Insumo).all()
	for r in records:
		widget = InsumoWidget(r)
		layout.add_widget(widget)
	


if __name__ == '__main__':
    Mistica().run()


