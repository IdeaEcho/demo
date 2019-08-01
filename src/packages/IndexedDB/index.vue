<template>
	<div class="main">
		<div class="v-form">
			<input type="text" class="v-input" placeholder="请输入姓名" name="username" v-model="username">
			<input type="text" class="v-input" placeholder="请输入年龄" name="age" v-model="age">
			<input type="text" class="v-input" placeholder="请输入邮箱" name="email" v-model="email">
			<button type="text" class="v-btn" @click="submit">提交</button>
		</div>
		<table class="table">
			<thead>
				<th>#</th>
				<th>用户名</th>
				<th>年龄</th>
				<th>邮箱</th>
				<th>操作</th>
			</thead>
			<tr v-for="(item,i) in dbData" :key="item.id">
				<td v-html="i+1"></td>
				<td v-html="item.username"></td>
				<td v-html="item.age"></td>
				<td v-html="item.email"></td>
				<td>
					<button class="edit" @click="edit(i)">编辑</button>
					<button class="del" @click="deleteOneData(item.id)">删除</button>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
export default {
	name: 'IndexedDB',
	db: '',
	data() {
		return {
			edit_id: 0,
			username: '',
			age: '',
			email: '',
			dbName: 'usersDB',
			dbVer: 1,
			dbData: []
		}
	},
	mounted() {
		this.openDB();
		// indexedDB.deleteDatabase('usersDB');
	},
	methods: {
		// 连接数据库
	  openDB() {
	    var request = indexedDB.open(this.dbName, this.dbVer);
	    request.onsuccess = (e)=>{
	      this.db = e.target.result;
	      console.log('连接数据库成功');
	      // 数据库连接成功后渲染表格
	      this.getData();
	    }
	    request.onerror = function() {
	      console.log('连接数据库失败');
	    }
	    request.onupgradeneeded = (e)=>{
	      this.db = e.target.result;
	      // 如果不存在Users对象仓库则创建
	      if (!this.db.objectStoreNames.contains('Users')) {
	        var store = this.db.createObjectStore('Users', {
	          keyPath: 'id',
	          autoIncrement: true
	        });
	        var idx = store.createIndex('index', 'username', {
	          unique: false
	        })
	      }
	    }
	  },
	  /**
	   * 保存数据
	   * @param {Object} data 要保存到数据库的数据对象
	   */
	  saveData(data) {
	    var tx = this.db.transaction('Users', 'readwrite');
	    var store = tx.objectStore('Users');
	    var req = store.put(data);
	    req.onsuccess = function() {
	      console.log('成功保存id为' + this.result + '的数据');
	    }
	  },
	  /**
	   * 删除单条数据
	   * @param {int} id 要删除的数据主键
	   */
	  deleteOneData(id) {
	    var tx = this.db.transaction('Users', 'readwrite');
	    var store = tx.objectStore('Users');
	    var req = store.delete(id);
	    req.onsuccess = ()=>{
	      // 删除数据成功之后重新渲染表格
	      this.getData();
	    }
	  },
	  /**
	   * 检索全部数据
	   * @param {function} callback 回调函数
	   */
	  searchData(callback) {
	    var tx = this.db.transaction('Users', 'readonly');
	    var store = tx.objectStore('Users');
	    var range = IDBKeyRange.lowerBound(1);
	    var req = store.openCursor(range, 'next');
	    // 每次检索重新清空存放数据数组
	    let dbData = [];
	    req.onsuccess = function() {
	      var cursor = this.result;
	      if (cursor) {
	        // 把检索到的值push到数组中
	        dbData.push(cursor.value);
	        cursor.continue();
	      } else {
					// 数据检索完成后执行回调函数
					callback && callback(dbData);
				}
	    }
	  },
		getData: function() {
			this.searchData((dbData)=>{
				this.dbData = dbData;
			});
		},
		submit() {
			if (this.username && this.age && this.email) {
				var param = {
					username: this.username,
					age: this.age,
					email: this.email
				}
				if (this.edit_id > 0) {
					param.id = this.edit_id
				}
				this.saveData(param);
				this.getData();
				this.username = this.age = this.email = '';
			}
		},
		edit(index) {
			this.username = this.dbData[index].username;
			this.age = this.dbData[index].age;
			this.email = this.dbData[index].email;
			this.edit_id = this.dbData[index].id;
		}
	}
}
</script>

<style lang="scss" scoped>
.v-input{
    float: left;
    border: 1px solid #ddd;
    height: 40px;
    width: 180px;
    padding:0 10px;;
    border-radius: 3px;
    margin:0 20px 0 0;
    box-sizing: border-box;
    font-size: 16px;
}
.v-btn{
    width: 85px;
    height: 40px;
    border: 1px solid #08aae5;
    border-radius: 3px;
    background: #08aae5;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
}

.table{
    width: 100%;
    text-align: center;
    border-spacing: 0;
    border-left: 1px solid #ddd;
    border-top: 1px solid #ddd;
    margin-top: 80px;
}

.table td,.main .table th{
    line-height: 40px;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
}

.table button{
    width: 60px;
    height: 24px;
    border: 1px solid #08aae5;
    border-radius: 3px;
    background: #08aae5;
    color: #fff;
    cursor: pointer;
}
.table button.del{
	color: #fff;
    border: 1px solid #F44336;
    background: #F44336;
}
</style>
