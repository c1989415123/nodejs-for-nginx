<<template>
  <div>
    <organization-chart :datasource="ds" :pan="true" :zoom="true"></organization-chart>
  </div>
</template>

<script>
  import OrganizationChart from 'vue-organization-chart'
  import 'vue-organization-chart/dist/orgchart.css'

  export default {
    components: {
      OrganizationChart
    },
    data () {
      return {
        ds: {
          'id': '1',
          'name': 'Lao Lao',
          'title': 'general manager',
          'children': [
            { 'id': '2', 'name': 'Bo Miao', 'title': 'department manager' ,
              'children': [
                { 'id': '2-1', 'name': 'Tie Hua', 'title': 'senior engineer' },
                { 'id': '2-2', 'name': 'Hei Hei', 'title': 'senior engineer',
                  'children': [
                    { 'id': '2-1-1', 'name': 'Pang Pang', 'title': 'engineer' },
                    { 'id': '2-1-2', 'name': 'Xiang Xiang', 'title': 'UE engineer' },
                    { 'id': '2-1-3', 'name': 'Pang Pang', 'title': 'engineer' },
                    { 'id': '2-1-4', 'name': 'Xiang Xiang', 'title': 'UE engineer' },
                    { 'id': '2-1-5', 'name': 'Pang Pang', 'title': 'engineer' },
                    { 'id': '2-1-6', 'name': 'Xiang Xiang', 'title': 'UE engineer' }
                  ]
                }
              ]
            },
            { 'id': '3', 'name': 'Su Miao', 'title': 'department manager',
              'children': [
                { 'id': '4', 'name': 'Tie Hua', 'title': 'senior engineer' },
                { 'id': '5', 'name': 'Hei Hei', 'title': 'senior engineer',
                  'children': [
                    { 'id': '6', 'name': 'Pang Pang', 'title': 'engineer' },
                    { 'id': '7', 'name': 'Xiang Xiang', 'title': 'UE engineer' }
                  ]
                }
              ]
            },
            { 'id': '8', 'name': 'Hong Miao', 'title': 'department manager' },
            { 'id': '9', 'name': 'Chun Miao', 'title': 'department manager' }
          ]
        }
      }
    }
  }
</script>
