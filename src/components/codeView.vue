<template>
<div>
  <div id="codeView" v-highlight>
    <pre><code v-html="code"></code></pre>
  </div>
  <el-dialog title="捕捉到系统调用了！！！" :visible.sync="dialogVisible" :closeOnClickModal="false">
    <h4 style="display:inline">
      系统调用号<h1 style="display:inline">{{syscall_num}}</h1>，系统调用名<h1 style="display:inline">{{syscall[syscall_num]}}</h1>
    </h4>
    <div slot="footer" class="dialog-footer">
      <Button type="primary" @click="dialogVisible=false">确 定</Button>
    </div>
  </el-dialog>
</div>
</template>

<style>
#codeView {
  text-align: left;
}
pre {
  margin-top: 0;
}
</style>

<script>
import { mapState } from 'vuex'

export default {
  name: "codeView",
  data() {
    return {
      dialogVisible: false,
      syscall_num: 0,
      defaultAssemb: [
        "example:\n",
        "0x0000000000400da0 <+0>:     push   %rbx\n",
        "0x0000000000400da1 <+1>:     cmp    $0x1,%edi\n",
        "0x0000000000400da4 <+4>:     jne    0x400db6 <main+22>\n"
      ],
      syscall: ["read","write","open","close","stat","fstat","lstat","poll","lseek","mmap","mprotect","munmap","brk","rt_sigaction","rt_sigprocmask","rt_sigreturn",
        "ioctl","pread64","pwrite64","readv","writev","access","pipe","select","sched_yield","mremap","msync","mincore","madvise","shmget","shmat","shmctl",
        "dup","dup2","pause","nanosleep","getitimer","alarm","setitimer","getpid","sendfile","socket","connect","accept","sendto","recvfrom","sendmsg","recvmsg",
        "shutdown","bind","listen","getsockname","getpeername","socketpair","setsockopt","getsockopt","clone","fork","vfork","execve","exit","wait4","kill",
        "uname","semget","semop","semctl","shmdt","msgget","msgsnd","msgrcv","msgctl","fcntl","flock","fsync","fdatasync","truncate","ftruncate","getdents",
        "getcwd","chdir","fchdir","rename","mkdir","rmdir","creat","link","unlink","symlink","readlink","chmod","fchmod","chown","fchown","lchown","umask",
        "gettimeofday","getrlimit","getrusage","sysinfo","times","ptrace","getuid","syslog","getgid","setuid","setgid","geteuid","getegid","setpgid","getppid",
        "getpgrp","setsid","setreuid","setregid","getgroups","setgroups","setresuid","getresuid","setresgid","getresgid","getpgid","setfsuid","setfsgid","getsid",
        "capget","capset","rt_sigpending","rt_sigtimedwait","rt_sigqueueinfo","rt_sigsuspend","sigaltstack","utime","mknod","uselib","personality","ustat",
        "statfs","fstatfs","sysfs","getpriority","setpriority","sched_setparam","sched_getparam","sched_setscheduler","sched_getscheduler","sched_get_priority_max",
        "sched_get_priority_min","sched_rr_get_interval","mlock","munlock","mlockall","munlockall","vhangup","modify_ldt","pivot_root","_sysctl","prctl",
        "arch_prctl","adjtimex","setrlimit","chroot","sync","acct","settimeofday","mount","umount2","swapon","swapoff","reboot","sethostname","setdomainname",
        "iopl","ioperm","create_module","init_module","delete_module","get_kernel_syms","query_module","quotactl","nfsservctl","getpmsg","putpmsg","afs_syscall",
        "tuxcall","security","gettid","readahead","setxattr","lsetxattr","fsetxattr","getxattr","lgetxattr","fgetxattr","listxattr","llistxattr","flistxattr",
        "removexattr","lremovexattr","fremovexattr","tkill","time","futex","sched_setaffinity","sched_getaffinity","set_thread_area","io_setup","io_destroy",
        "io_getevents","io_submit","io_cancel","get_thread_area","lookup_dcookie","epoll_create","epoll_ctl_old","epoll_wait_old","remap_file_pages","getdents64",
        "set_tid_address","restart_syscall","semtimedop","fadvise64","timer_create","timer_settime","timer_gettime","timer_getoverrun","timer_delete",
        "clock_settime","clock_gettime","clock_getres","clock_nanosleep","exit_group","epoll_wait","epoll_ctl","tgkill","utimes","vserver","mbind","set_mempolicy",
        "get_mempolicy","mq_open","mq_unlink","mq_timedsend","mq_timedreceive","mq_notify","mq_getsetattr","kexec_load","waitid","add_key","request_key","keyctl",
        "ioprio_set","ioprio_get","inotify_init","inotify_add_watch","inotify_rm_watch","migrate_pages","openat","mkdirat","mknodat","fchownat","futimesat",
        "newfstatat","unlinkat","renameat","linkat","symlinkat","readlinkat","fchmodat","faccessat","pselect6","ppoll","unshare","set_robust_list",
        "get_robust_list","splice","tee","sync_file_range","vmsplice","move_pages","utimensat","epoll_pwait","signalfd","timerfd_create","eventfd","fallocate",
        "timerfd_settime","timerfd_gettime","accept4","signalfd4","eventfd2","epoll_create1","dup3","pipe2","inotify_init1","preadv","pwritev","rt_tgsigqueueinfo",
        "perf_event_open","recvmmsg","fanotify_init","fanotify_mark","prlimit64","name_to_handle_at","open_by_handle_at","clock_adjtime","syncfs","sendmmsg",
        "set_ns","get_cpu","process_vm_readv","process_vm_writev",]
    }
  },
  computed: {
    ...mapState([
      'assmb_data',
      'isAsm',
      'source_data'
    ]),
    code() {
      let code = ""
      if (this.isAsm) {
        code = this.getAsm(this.assmb_data)
      } else {
        code = this.getSource(this.source_data)
      }
      return code
    }
  },
  methods: {
    getSource(source_data) {
      let source = ''
      for (let i = 1; i < source_data.length; i++) {
        source += source_data[i]
          .replace(/^\d+\\t/g, i + ' ')
          .replace(/\\n$/g, '\n')
          .replace(/\\/g, '')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
      }
      // console.log(source)
      return source
    },
    getAsm(asmStrList) {
      let asm = ''
      // console.log('asmStrList --->', asmStrList)
      // 如果获取到的assmb是undefined，或者为空数组，那么asmStrList设为默认
      if (asmStrList == undefined || asmStrList.length == 0)
        asmStrList = this.defaultAssemb
      // 将汇编字符串数组拼接成汇编字符串
      for (let i = 0; i < asmStrList.length; i++) {
        if (i > 0 && asmStrList[i].match(/=>/) != null && asmStrList[i-1].match(/syscall/) != null) {
          console.log("getAsm():", asmStrList[i-2])
          let hex_nums = asmStrList[i-2].match(/0x\w+/g)
          if (hex_nums != null && hex_nums.length >= 2) {
            this.syscall_num = parseInt(hex_nums[1], 16)
            console.log("getAsm():", this.syscall_num)
            this.dialogVisible = true
          }
        }
        asmStrList[i] = asmStrList[i].replace(/\\t/g, "\t")
        asmStrList[i] = asmStrList[i].replace(/\\n/g, "\n")
        asm += asmStrList[i]
      }
      return asm
    }
  }
}
</script>