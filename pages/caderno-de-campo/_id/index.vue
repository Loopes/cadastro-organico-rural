<template>
  <div>
    <div v-if="field_notebook" class="create">
      <v-btn
        v-if="$auth.user && $auth.user._id === field_notebook.user"
        :to="'/caderno-de-campo/'+ field_notebook._id + '/editar'"
        fab
        top
        right
        fixed
        color="primary"
        class="lighten-2"
      >
        <v-icon dark>mdi-pencil</v-icon>
      </v-btn>
      <Breadcrumb active="Caderno de campo" parent="/caderno-de-campo" />
      <div>
        <h1 class="mb-0 text-h4 font-weight-bold"> {{ field_notebook.name }} </h1>
        <br>
        <p class="mt-3"><span class="overline">Código de Rastreabilidade:</span><br><strong>{{ field_notebook.codTraceability }}</strong></p>
        <p class="mt-3"><span class="overline">Tipos:</span><br>
          <strong v-for="(item, index) in field_notebook.type" :key="index">
            {{ item }} <br>
          </strong>
        </p>
        <p v-if="field_notebook.productionUnit" class="mt-3"><span class="overline">Status:</span><br><strong>{{ field_notebook.status }}</strong></p>
        <br>
        <p v-if="field_notebook.productionUnit" class="mt-3"><span class="overline">Unidade de Produção:</span><br><strong>{{ field_notebook.productionUnit.name }}</strong></p>
        <PointPreview v-if="production_unity.farm_house_location && production_unity.farm_house_location.coordinates.length" :point="production_unity.farm_house_location" label="Sede da propriedade" />
        <AddressPreview v-if="production_unity" :address="production_unity.correspondence_address" label="Endereço de correspondência" />
        <div v-if="production_unity.responsibles && production_unity.responsibles.length" class="mb-6">
          <Responsibles :items="production_unity.responsibles" />
        </div>
        <br>
        <p v-if="certifying_entity">
          <span class="overline">Entidade certificadora:</span>
          <br>
          <n-link class="text-decoration-none" :to="'/entidades-certificadoras/' + certifying_entity._id"><strong>{{ certifying_entity.name }}</strong> ({{ certifying_entity.city }} - {{ certifying_entity.uf }})</n-link>
        </p>
        <br>
        <div v-if="field_notebook.productionActivitie" class="mb-6">
          <ProductionActivities :items="field_notebook.productionActivitie" :onlyThisYear="true" />
        </div>
        <p v-if="field_notebook.observation" class="mt-3" style="white-space: pre-line;"><span class="overline">Observações:</span><br><strong>{{ field_notebook.observation }}</strong></p>
        <br>
        <p v-if="field_notebook.rawMaterial[0]" class="mt-3"><strong>Insumos:</strong></p>
        <v-row  v-for="(a, index) in field_notebook.rawMaterial" :key="index" class="table">
            <v-col cols="12" md="3">
            <v-col cols="12" md="6">
              <span class="overline">Nome | Categoria: <br></span>
              {{ a.name }} | {{a.category}}
            </v-col>
            <v-col cols="12" md="6">
              <span class="overline">Observações: <br></span>
              {{ a.observation && a.observation }}
            </v-col>
          </v-col>
          <v-col cols="12" md="3">
            <v-col cols="12" md="6">
              <span class="overline">Quantidade (Em {{a.uM}}): <br></span>
              {{ a.qtd }}
            </v-col>
            <v-col cols="12" md="6">
              <span class="overline">Área Aplicada: <br></span>
              {{ a.appliedArea }}
            </v-col>
          </v-col>
          <v-col cols="12" md="4">
            <v-col cols="12" md="6">
              <span class="overline">Data de Aplicação Inicial <br></span>
              {{ a.dateInit }}
            </v-col>
            <v-col cols="12" md="6">
              <span class="overline">Data de Aplicação Final: <br></span>
              {{ a.dateFinal }}
            </v-col>
          </v-col>
          <Documents v-if="a.documents" :documents="a.documents" />
        </v-row>
        <br>
        <p v-if="field_notebook.activities[0]" class="mt-3"><strong>Atividades:</strong></p>
        <v-row  v-for="(a, index) in field_notebook.activities" :key="index" class="table">
          <v-col cols="12" md="3">
            <v-col cols="12" md="6">
              <span class="overline">Título: <br></span>
              {{ a.title }}
            </v-col>
            <v-col cols="12" md="6">
              <div >
                <span class="overline">Observações: <br></span>
                {{ a.observation ? a.observation : '' }}
              </div>
            </v-col>
          </v-col>
          <v-col cols="12" md="3">
            <v-col cols="12" md="6">
              <span class="overline">Status | Categoria: <br></span>
              {{ a.status }} | {{ a.category }}
            </v-col>
            <v-col cols="12" md="6">
              <span class="overline">Periodo: <br></span>
              {{ a.period }}
            </v-col>
          </v-col>
          <v-col cols="12" md="2">
            <v-col cols="12" md="6">
              <span class="overline">Data Inicial <br></span>
              {{ a.dateInit ? a.dateInit : a.extra.dateInit }}
            </v-col>
            <v-col cols="12" md="6">
              <span class="overline">Data Final: <br></span>
              {{ a.dateFinal ? a.dateFinal : a.extra.dateFinal }}
            </v-col>
          </v-col>
          <v-col cols="12" md="2">
            <v-col cols="12" md="6">
              <span class="overline">Insumos: <br></span>
              <div v-for="(raw, index) in a.rawMaterials" :key="index" >{{ raw.name }}</div>
            </v-col>
            <v-col cols="12" md="6">
              <span class="overline">Inspecionado: <br></span>
              {{ a.inspect }}
            </v-col>
          </v-col>
          <v-col cols="12" md="1">
            <v-col cols="12" md="8">
            </v-col>
            <v-col cols="12" md="4">
               <Documents v-if="a.documents" :documents="a.documents" />
            </v-col>
          </v-col>
        </v-row>
        <p v-if="field_notebook.harvest[0]" class="mt-3"><strong>Colheitas:</strong></p>
        <v-row  v-for="(a, index) in field_notebook.harvest" :key="index" class="table">
          <v-col cols="12" md="3">
            <v-col cols="12" md="6">
              <span class="overline">Tipo: <br></span>
              {{ a.type }}
            </v-col>
            <v-col cols="12" md="6">
              <div >
                <span class="overline">Observações: <br></span>
                {{ a.observation ? a.observation : '' }}
              </div>
            </v-col>
          </v-col>
          <v-col cols="12" md="3">
            <v-col cols="12" md="6">
              <span class="overline">Categoria: <br></span>
              {{ a.category }}
            </v-col>
            <v-col cols="12" md="6">
              <span class="overline">Quantidade ({{a.unidMed}}): <br></span>
              {{ a.qntd }}
            </v-col>
          </v-col>
          <v-col cols="12" md="3">
            <v-col cols="12" md="6">
              <span class="overline">Data de Colheita <br></span>
              {{ a.dateHarvest }}
            </v-col>
            <v-col cols="12" md="6">
              <span class="overline">Data de Validade: <br></span>
              {{ a.dateValidity }}
            </v-col>
          </v-col>
          <v-col cols="12" md="1">
            <v-col cols="12" md="8">
            </v-col>
            <v-col cols="12" md="4">
               <Documents v-if="a.documents" :documents="a.documents" />
            </v-col>
          </v-col>
        </v-row>
        <br>
        <p><span class="overline">Cadastrado em:</span><br><strong>{{ $moment(field_notebook.createdAt).format("DD/MM/YYYY") }}</strong></p>
        <br>
        <qrcode-vue :value="route" :level="H" :size="250" :render-as="'canva'"/>
        <div style="width: 12vw;">
          <Documents :documents="qr" />
        </div>

      </div>
    </div>
    <div v-else class="text-center">
      <v-progress-circular indeterminate small />
    </div>
  </div>
</template>
<script>
import QrcodeVue from 'qrcode.vue'

export default {
  components: {
    QrcodeVue
  },
  data () {
    return {
      field_notebook: null,
      certifying_entity: {},
      production_unity: {},
      route: '',
      qr: []
    }
  },
  async created () {
    this.field_notebook = await this.$axios.$get('/api/field_notebook/' + this.$route.params.id)
    this.field_notebook.productionActivitie = [this.field_notebook.productionActivitie]
    this.production_unity = await this.$axios.$get('/api/production_units/' + this.field_notebook.productionUnit.id)
    this.certifying_entity = await this.$axios.$get('/api/certifying_entities/' + this.production_unity.certifying_entity)
    this.route = process.env.BASE_URL + this.$router.currentRoute.fullPath
    this.qr.push({
      url: 'api/uploads/qr_code/qr_code_field_notebook_' + this.field_notebook.name + '_' + this.field_notebook._id + '.png',
      title: 'QR CODE'
    })
    await this.$axios.$post('/api/qr_code?url=' + this.route + '&title=field_notebook_' + this.field_notebook.name + '&id=' + this.field_notebook._id)
  }
}
</script>
